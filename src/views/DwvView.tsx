import React, { Component } from "react";
import DwvComponent from "../components/dwv/DwvComponent";
import PointCenterMenu from "../components/PointCenterMenu";
import ThreePointsMenu from "../components/ThreePointsMenu";

import { Row, Col } from "antd";
import { CustomCard, CustomSelect } from "../components/common";
import { Point, Circle } from "../utils/Models";

import { getCircleThrough3Point } from "../utils/math";
import styled from "styled-components";

type Props = {};

type MenuOption = "3point" | "1pointcenter" | null;

type State = {
    isDicomLoaded: boolean;
    option: number;
    draw: boolean;
    points: Point[];
    circle: Circle;
    canChoosePoints: boolean;
    reset: boolean;
    pixelSpacing: string;
    menuOption: MenuOption;
    radius: number;
};

class DwvView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isDicomLoaded: false,
            option: 0,
            draw: false,
            points: [],
            circle: { center: { x: 0, y: 0 }, r: 0 },
            canChoosePoints: false,
            reset: false,
            pixelSpacing: "0",
            menuOption:  null,
            radius: 0
        };
    }

    render() {
        const { isDicomLoaded, draw, circle, reset, pixelSpacing } = this.state;

        return (
            <Dwv>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <CustomCard title="Konfiguruj">
                            <>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <CustomSelect
                                            options={this.options}
                                            onChange={e => this.handleOptionChange(e)}
                                            placeholder="Wybierz opcję"
                                            disabled={!isDicomLoaded}
                                            title="Uwaga!"
                                            infoContent={<>Aby móć wybrać opcję wgraj plik DIcom</>}
                                        />
                                    </Col>
                                </Row>
                                {this.action()}
                            </>
                        </CustomCard>
                    </Col>
                    <Col span={12}>
                        <DwvComponent
                            handleDicomLoadedState={this.handleDicomLoadedState}
                            handleReset={this.handleReset}
                            handlePixelSpacing={this.handlePixelSpacing}
                            draw={draw}
                            reset={reset}
                            handleDraw={this.handleDraw}
                            addPoint={this.handleAddPoint}
                            circle={circle}
                            hasPixelSpacing={Boolean(parseFloat(pixelSpacing))}
                        />
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </Dwv>
        );
    }

    handleDicomLoadedState = (state: boolean) => {
        this.setState({ isDicomLoaded: state });
    };

    handlePixelSpacing = (value : string) => {
        this.setState({ pixelSpacing: value })
    }

    handleDraw = (state: boolean) => {
        this.setState({ draw: state });
    };

    handleOptionChange = (e: number ) => {
        if(e === 1){
            this.setState({menuOption: "3point"})
        }
        else if(e == 2){
            this.setState({menuOption:"1pointcenter"})
        } 
        this.setState({option: e})    
    }

    handleRadiusChange = (value: number) => {
        this.setState({radius: value });
    }

    handleReset = (state: boolean) => {
        if(state){
            this.setState({ points: [], radius: 0 });
        }
        this.setState({ reset: state} );
    };

    handlePointsButton = (state: boolean) => {
        this.setState({ canChoosePoints: state });
    };

    action = () => {
        const { option, points, circle, pixelSpacing, radius } = this.state;

        switch (option) {
            case 1:
                return (
                    <ThreePointsMenu
                        handlePointsButton={this.handlePointsButton}
                        points={points}
                        circle={circle}
                        handleReset={this.handleReset}
                        pixelSpacing={pixelSpacing}
                    />
                );
            case 2:
                return <PointCenterMenu 
                            handlePointsButton={this.handlePointsButton} 
                            points={points} 
                            circle={circle} 
                            handleReset={this.handleReset} 
                            handleRadiusChange={this.handleRadiusChange}
                            pixelSpacing={pixelSpacing}
                            radius={radius}
                    />;
            default:
                return <></>;
        }
    };

    handleAddPoint = (a: number, b: number, ) => {
        const { points, canChoosePoints, menuOption } = this.state;
        
        const point: Point = { x: a, y: b };


        switch (menuOption) {
            case "3point":
                if (points.length < 3 && canChoosePoints) {
                    this.setState({ points: [...points, point] }, () => {
                        if (this.state.points.length === 3) {
                            const circle: Circle = getCircleThrough3Point(
                                this.state.points[0],
                                this.state.points[1],
                                this.state.points[2]
                            );
                            this.setState(
                                {
                                    draw: true,
                                    circle: circle,
                                    canChoosePoints: false,
                                },
                                () => this.handleDraw(false)
                            );
                        }
                    });
                }
                break;
        
            case "1pointcenter":
                if(points.length < 1 && canChoosePoints){
                    
                    const { radius } = this.state;

                    this.setState({ points: [...points, point] }, () => {
                        if (this.state.points.length === 1) {

                            const circle: Circle = { center : { x: point.x, y: point.y }, r: radius }; 
                            
                            console.log(circle)
                            this.setState(
                                {
                                    draw: true,
                                    circle: circle,
                                    canChoosePoints: false,
                                },
                                () => this.handleDraw(false)
                            );
                        }
                    });
                }    
                break;
        
            default:
                break;
        }
        
    };

    options = [
        {
            label: "Koło na podstawie trzech punktów",
            value: 1,
        },
        {
            label: "Koło środek, promień",
            value: 2,
        },
    ];
}

const Dwv = styled.div`
    padding: 50px;
`;

export default DwvView;
