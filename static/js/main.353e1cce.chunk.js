(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{201:function(e,a,t){e.exports=t(392)},206:function(e,a,t){},227:function(e,a){},229:function(e,a){},378:function(e,a,t){},389:function(e,a,t){},392:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),r=t(16),s=t.n(r),d=(t(206),t(69)),i=t(70),l=t(77),c=t(80),p=t(124),u=t.n(p),m=t(174),v=t(394),g=t(45),f=t(396),h=t(395),w=(t(207),t(59)),D=t.n(w),E=t(393),b=function(e){Object(c.a)(t,e);var a=Object(l.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).columns=[{title:"Tag",dataIndex:"name",key:"name"},{title:"Value",dataIndex:"value",key:"value"}],n.state={data:n.props.data},n}return Object(i.a)(t,[{key:"render",value:function(){var e=this.state.data;return o.a.createElement(E.a,{dataSource:e,columns:this.columns})}}]),t}(o.a.Component);t(378);D.a.gui.getElement=D.a.gui.base.getElement,D.a.image.decoderScripts={jpeg2000:"assets/dwv/decoders/pdfjs/decode-jpeg2000.js","jpeg-lossless":"assets/dwv/decoders/rii-mango/decode-jpegloss.js","jpeg-baseline":"assets/dwv/decoders/pdfjs/decode-jpegbaseline.js",rle:"assets/dwv/decoders/dwv/decode-rle.js"};var S=function(e){Object(c.a)(t,e);var a=Object(l.a)(t);function t(e){var n;return Object(d.a)(this,t),(n=a.call(this,e)).initializeDwv=function(){var e=new D.a.App;e.init({containerDivId:"dwv",tools:n.state.tools}),n.addEventListeners(e),n.setState({dwvApp:e}),n.setupDropbox(e),D.a.utils.loadFromUri(window.location.href,e)},n.addEventListeners=function(e){var a=null,t=null;e.addEventListener("load-start",(function(){a=0,t=0})),e.addEventListener("load-progress",(function(e){n.setState({loadProgress:e.loaded})})),e.addEventListener("load",(function(){n.setState({metaData:D.a.utils.objectToArray(e.getMetaData())});var a="Scroll";e.isMonoSliceData()&&1===e.getImage().getNumberOfFrames()&&(a="ZoomAndPan"),n.onChangeTool(a),n.hideDropbox(),n.setState({dataLoaded:!0})})),e.addEventListener("load-end",(function(){a&&(n.setState({loadProgress:0}),alert("Received errors during load. Check log for details.")),t&&(n.setState({loadProgress:0}),alert("Load was aborted.")),n.setState({loadProgress:100})})),e.addEventListener("frame-change",(function(e){n.setState({frame:e.frame})})),e.addEventListener("error",(function(e){console.error(e.error),++a})),e.addEventListener("abort",(function(){++t})),e.addEventListener("keydown",(function(a){e.defaultOnKeydown(a)})),e.addEventListener("draw-move",(function(){n.updateDrawingState()})),e.addEventListener("draw-change",(function(){n.updateDrawingState()})),e.addEventListener("draw-create",(function(e){n.updateDrawingState("add",e.id)})),e.addEventListener("draw-delete",(function(e){n.updateDrawingState("delete",e.id)})),window.addEventListener("resize",e.onResize)},n.updateDrawingState=Object(m.a)(u.a.mark((function e(){var a,t,o,r,s,d,i=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=i.length>0&&void 0!==i[0]?i[0]:null,t=i.length>1&&void 0!==i[1]?i[1]:null,!(o=n.state.dwvApp)){e.next=11;break}return r=new D.a.State,s=r.toJSON(o),d=JSON.parse(s),e.next=9,n.props.onStateChange(d);case 9:"add"===a&&n.props.addNewShape(t),"delete"===a&&n.props.deleteShape(t);case 11:case"end":return e.stop()}}),e)}))),n.getFramesNumberOfDicom=function(){var e=n.state.metaData;if(e){var a=e.find((function(e){return"NumberOfFrames"===e.name})),t=a&&a.value;return t&&parseInt(t)-1}},n.onChangeTool=function(e){var a=n.state,t=a.dwvApp,o=a.tools.Draw.options;t&&(n.setState({selectedTool:e}),t.setTool(e),"Draw"===e&&n.onChangeShape(o[0]))},n.onChangeShape=function(e){var a=n.state.dwvApp;a&&a.setDrawShape(e)},n.handleTagsDialogOpen=function(){n.setState({showDicomTags:!0})},n.handleTagsDialogClose=function(){n.setState({showDicomTags:!1})},n.setupDropbox=function(e){var a=e.getElement("layerContainer");a&&(a.addEventListener("dragover",n.onDragOver),a.addEventListener("dragleave",n.onDragLeave),a.addEventListener("drop",n.onDrop));var t=e.getElement(n.state.dropboxClassName);if(t){var o=2*e.getLayerContainerSize().height/3;t.setAttribute("style","width:"+o+"px;height:"+o+"px")}},n.onDragOver=function(e){var a=n.state,t=a.dwvApp,o=a.borderClassName,r=a.hoverClassName;e.stopPropagation(),e.preventDefault();var s=t.getElement(o);s&&-1===s.className.indexOf(r)&&(s.className+=" "+r)},n.onDragLeave=function(e){var a=n.state,t=a.dwvApp,o=a.hoverClassName;e.stopPropagation(),e.preventDefault();var r=t.getElement(n.borderClassName+" hover");r&&-1!==r.className.indexOf(o)&&(r.className=r.className.replace(" "+o,""))},n.hideDropbox=function(){var e=n.state,a=e.dwvApp,t=e.dropboxClassName,o=a.getElement(t);o&&o.parentNode.removeChild(o)},n.onDrop=function(e){var a=n.state.dwvApp;e.stopPropagation(),e.preventDefault(),a.loadFiles(e.dataTransfer.files),n.hideDropbox()},n.state={tools:{Draw:{options:["Ellipse"],type:"factory",events:["draw-create","draw-change","draw-move","draw-delete"]},ZoomAndPan:{}},selectedTool:"Select Tool",loadProgress:0,dataLoaded:!1,dwvApp:null,metaData:[],showDicomTags:!1,dropboxClassName:"dropBox",borderClassName:"dropBoxBorder",hoverClassName:"hover",frame:0},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.initializeDwv()}},{key:"componentDidUpdate",value:function(e){if(this.props.dicom!==e.dicom&&null!==this.props.dicom){var a=[this.props.dicom];this.state.dwvApp.loadFiles(a)}this.props.selectedTool!==e.selectedTool&&this.onChangeTool(this.props.selectedTool)}},{key:"render",value:function(){var e=this.state,a=e.loadProgress,t=e.dataLoaded,n=e.metaData,r=e.selectedTool,s=e.showDicomTags;return o.a.createElement("div",{id:"dwv"},o.a.createElement(v.a,{percent:a}),o.a.createElement(g.a,{onClick:this.handleTagsDialogOpen,disabled:!t},"Tagi DICOM"),"Draw"===r&&o.a.createElement(f.a,null,"Dodawanie / Edycja artefaktu..."),o.a.createElement(h.a,{visible:s,onCancel:this.handleTagsDialogClose,width:1e3,footer:null},o.a.createElement(b,{data:n})),o.a.createElement("div",{className:"layerContainer"},o.a.createElement("div",{className:"dropBox dropBoxBorder"},"Drag and drop data here."),o.a.createElement("canvas",{className:"imageLayer",onClick:this.calculateClickPosition},"Only for HTML5 compatible browsers..."),o.a.createElement("div",{className:"drawDiv"})),this.getFramesNumberOfDicom()&&"Frame: ".concat(this.state.frame," / ").concat(this.getFramesNumberOfDicom()))}}]),t}(o.a.Component),C=function(e){Object(c.a)(t,e);var a=Object(l.a)(t);function t(){return Object(d.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(S,null))}}]),t}(n.Component),O=t(397),N=function(e){return o.a.createElement(f.a,{gutter:[16,16]},o.a.createElement(O.a,{span:8}),o.a.createElement(O.a,{span:8},e.content),o.a.createElement(O.a,{span:8}))};t(389),t(390);var j=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(N,{content:o.a.createElement(C,null)}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[201,1,2]]]);
//# sourceMappingURL=main.353e1cce.chunk.js.map