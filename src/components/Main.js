require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (let i = 0, j = imageDatasArr.length; i < j; i++) {
        let singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

// 创建一个单幅画的组件
class ImgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {
  Constant () {
    return {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {   // 水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {    // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }}
  };

   /*
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearrange (centerIndex) {
    console.log(this);
    let imgsArrangArr = this.state.imgsArrangArr,
        Constant = this.Constant(),
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };
    console.log(hPosRange);
  };
  constructor(props) {
    super(props);
    this.state = { imgsArrangArr: [

    ] };
  };

  // 组件加载以后， 为每张图片计算其位置的范围
  componentDidMount() {
    // 首先拿到舞台的大小
    let stageDOM = this.refs.stage,
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
    // 拿到一个imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);
        console.log('111');
        console.log(this);
        console.log(this.Constant());
        console.log('qqqq');
    // 计算中心图片的位置点
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant().hPosRange.leftSecX[0] = -halfImgW;
    this.Constant().hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant().hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant().hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant().hPosRange.y[0] = -halfImgH;
    this.Constant().hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant().vPosRange.topY[0] = -halfImgH;
    this.Constant().vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant().vPosRange.x[0] = halfStageW - imgW;
    this.Constant().vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  };

  render() {

    let controllerUnits = [], imgFigures = [];

    imageDatas.forEach(function (value, index) {
      if (!this.state.imgsArrangArr[index]) {
        this.state.imgsArrangArr[index] = {
          pos: {
            left: '0',
            top: '0'
          }
        }
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
