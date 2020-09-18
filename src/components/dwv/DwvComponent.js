import React from 'react';
import { Progress, Button, Row, Modal } from 'antd';
import _ from 'lodash';
import dwv from 'dwv';

import TagsTable from './TagsTable';
import './DwvComponent.css';

dwv.gui.getElement = dwv.gui.base.getElement;

dwv.image.decoderScripts = {
    "jpeg2000": "assets/dwv/decoders/pdfjs/decode-jpeg2000.js",
    "jpeg-lossless": "assets/dwv/decoders/rii-mango/decode-jpegloss.js",
    "jpeg-baseline": "assets/dwv/decoders/pdfjs/decode-jpegbaseline.js",
    "rle": "assets/dwv/decoders/dwv/decode-rle.js"
};

class DwvComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tools: {
                Draw: {
                    options: ['Ellipse'],
                    type: 'factory',
                    events: ['draw-create', 'draw-change', 'draw-move', 'draw-delete']
                },
                ZoomAndPan: {}
            },
            selectedTool: 'Select Tool',
            loadProgress: 0,
            dataLoaded: false,
            dwvApp: null,
            metaData: [],
            showDicomTags: false,
            dropboxClassName: 'dropBox',
            borderClassName: 'dropBoxBorder',
            hoverClassName: 'hover',
            frame: 0,
        };
    }

    componentDidMount() {
        this.initializeDwv();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.dicom !== prevProps.dicom) && this.props.dicom !== null) {
            const arr = [this.props.dicom];
            this.state.dwvApp.loadFiles(arr);
        }

        if (this.props.selectedTool !== prevProps.selectedTool) {
            this.onChangeTool(this.props.selectedTool);
        }

        if (this.props.draw) { this.drawCircle(); }

        if(this.props.reset){ console.log("xd"); this.removeDrawings(); }
      }

    render() {
        const { loadProgress, dataLoaded, metaData, selectedTool, showDicomTags } = this.state;

        return (
            <div id='dwv'>
                <Progress percent={loadProgress} />
                <Button onClick={this.handleTagsDialogOpen} disabled={!dataLoaded}>
                    Tagi DICOM
                </Button>
                {selectedTool === 'Draw' && <Row>Dodawanie / Edycja artefaktu...</Row>}
                <Modal
                    visible={showDicomTags}
                    onCancel={this.handleTagsDialogClose}
                    width={1000}
                    footer={null}
                >
                    <TagsTable data={metaData} />
                </Modal>
                <div className="layerContainer">
                    <div className="dropBox dropBoxBorder">
                        Przeciągnij i upuść tutaj
                    </div>
                    <canvas className="imageLayer" onClick={this.calculateClickPosition} onClick={e => this.onCanvasClick(e)}>
                        Only for HTML5 compatible browsers...
                    </canvas>
                    <div className="drawDiv"></div>
                </div>
                { this.getFramesNumberOfDicom() && `Frame: ${this.state.frame} / ${this.getFramesNumberOfDicom()}` }
            </div>
        );
    }

    initializeDwv = () => {
        var app = new dwv.App();
        
        app.init({
            "containerDivId": "dwv",
            "tools": this.state.tools
        });

        this.addEventListeners(app);

        this.setState({ dwvApp: app });

        this.setupDropbox(app);

        dwv.utils.loadFromUri(window.location.href, app);
    }

    addEventListeners = (app) => {
        let nReceivedError = null;
        let nReceivedAbort = null;
        
        app.addEventListener('load-start', () => {
            nReceivedError = 0;
            nReceivedAbort = 0;
        });
        
        app.addEventListener("load-progress", (event) => {
            this.setState({ loadProgress: event.loaded });
        });
        
        app.addEventListener("load", () => {
            this.setState({ metaData: dwv.utils.objectToArray(app.getMetaData()) });
            let selectedTool = 'Scroll'
            if (app.isMonoSliceData() && app.getImage().getNumberOfFrames() === 1) {
                selectedTool = 'ZoomAndPan';
            }
            this.onChangeTool(selectedTool);
            this.hideDropbox();
            this.setState({ dataLoaded: true });
        });
        
        app.addEventListener('load-end', () => {
            if (nReceivedError) {
                this.setState({ loadProgress: 0 });
                alert('Received errors during load. Check log for details.');
            }
            if (nReceivedAbort) {
                this.setState({ loadProgress: 0 });
                alert('Load was aborted.');
            }
            this.setState({ loadProgress: 100 }, () => {
                this.props.handleDicomLoadedState(true);
            });
        });
        
        app.addEventListener('frame-change', (event) => {
            this.setState({ frame: event.frame })
        });
        
        app.addEventListener('error', (event) => {
            console.error(event.error);
            ++nReceivedError;
        });
        
        app.addEventListener('abort', () => {
            ++nReceivedAbort;
        });

        app.addEventListener('keydown', (event) => {
            app.defaultOnKeydown(event);
        });

        app.addEventListener('draw-move', () => {
            this.updateDrawingState();
        });
        app.addEventListener('draw-change', () => {
            this.updateDrawingState();
        });

        app.addEventListener('draw-create', (obj) => {
            this.updateDrawingState('add', obj.id);
        });

        app.addEventListener('draw-delete', (obj) => {
            this.updateDrawingState('delete', obj.id);
        });

        window.addEventListener('resize', app.onResize);
    }

    updateDrawingState = async (mode = null, id = null) => {
        const { dwvApp } = this.state;
        
        if (dwvApp) {
            const state = new dwv.State();
            const jsonStr = state.toJSON(dwvApp); 
            const json = JSON.parse(jsonStr);

            await this.props.onStateChange &&  this.props.onStateChange(json);

            if (mode === 'add') {
                this.props.addNewShape && this.props.addNewShape(id);
            }

            if (mode === 'delete') {
                this.props.addNewShape && this.props.deleteShape(id);
            }
        }
    }

    getFramesNumberOfDicom = () => {
        const { metaData } = this.state;

        if (metaData) {
            const frameInfo = metaData.find(el => el.name === 'NumberOfFrames');
            const frames = frameInfo && frameInfo.value;

            return frames && parseInt(frames) - 1 
        }
    } 
    
    removeDrawings = () => {
        const { dwvApp } = this.state;
        dwvApp.deleteDraws();
        this.props.handleReset && this.props.handleReset(false);
    }

    onChangeTool = tool => {
        const {dwvApp, tools: {Draw: {options}}} = this.state;

        if (dwvApp) {
            this.setState({ selectedTool: tool });
            dwvApp.setTool(tool);

            if (tool === 'Draw') {
                this.onChangeShape(options[0]);
            }
        }
    }

    onChangeShape = shape => {
        const { dwvApp } = this.state;

        if (dwvApp) { dwvApp.setDrawShape(shape); }
    }

    handleTagsDialogOpen = () => {
        this.setState({ showDicomTags: true });
    }

    handleTagsDialogClose = () => {
        this.setState({ showDicomTags: false });
    };

    setupDropbox = app => {
        
        const layerContainer = app.getElement('layerContainer');

        if (layerContainer) {
            layerContainer.addEventListener('dragover', this.onDragOver);
            layerContainer.addEventListener('dragleave', this.onDragLeave);
            layerContainer.addEventListener('drop', this.onDrop);
        }

        const box = app.getElement(this.state.dropboxClassName);

        if (box) {
            const size = app.getLayerContainerSize();
            const dropBoxSize = 2 * size.height / 3;

            box.setAttribute('style', 'width:' + dropBoxSize + 'px;height:' + dropBoxSize + 'px');
        }
    }

    onDragOver = event => {
        const { dwvApp, borderClassName, hoverClassName } = this.state;

        event.stopPropagation();
        event.preventDefault();

        const box = dwvApp.getElement(borderClassName);

        if (box && box.className.indexOf(hoverClassName) === -1) {
            box.className += ' ' + hoverClassName;
        }
    }

    onDragLeave = event => {
        const { dwvApp, hoverClassName} = this.state;

        event.stopPropagation();
        event.preventDefault();

        const box = dwvApp.getElement(this.borderClassName + ' hover');

        if (box && box.className.indexOf(hoverClassName) !== -1) {
            box.className = box.className.replace(' ' + hoverClassName, '');
        }
    }

    hideDropbox = () => {
        const { dwvApp, dropboxClassName} = this.state;

        const box = dwvApp.getElement(dropboxClassName);

        if (box) { box.parentNode.removeChild(box); }
    }

    onDrop = event => {
        const { dwvApp } = this.state;

        event.stopPropagation();
        event.preventDefault();
        
        dwvApp.loadFiles(event.dataTransfer.files);
        this.hideDropbox();
    }

    drawCircle = () => {
        const { dwvApp, loadProgress, dataLoaded } = this.state;
        const { circle: { center: { x, y }, r } } = this.props;

        if (dwvApp && dataLoaded && loadProgress === 100) {
            const c = new dwv.math.Point2D(x, y);
            const a = new dwv.math.Point2D(x + r, y + r);

            const shapeGroup = new dwv.tool.draw.EllipseFactory.prototype.create(
                [c, a],
                dwvApp.getStyle(),
                dwvApp.getImage()
            );

            const layer = dwvApp.getDrawController().getDrawLayer();

            layer.add(shapeGroup);

            layer.draw();
        }
    };


    onCanvasClick = e => {
        const { dwvApp } = this.state;

        const layer = dwvApp.getImageLayer();

        const { width, height } = dwvApp.getImageData();

        const canvas = layer.getCanvas();

        const xFactor = width / canvas.width;
        const yFactor = height / canvas.height;

        const x = (e.clientX - e.target.getBoundingClientRect().left) * xFactor;
        const y = (e.clientY - e.target.getBoundingClientRect().top) * yFactor;

        this.props.addPoint && this.props.addPoint(x, y);
    };



} 

export default DwvComponent;
