import React from "react";

//this.props.seconds 传入秒数
//this.props.minutes 传入分钟数
//this.props.hours 传入小时数
//this.props.msg 传入时间到时显示信息
//this.props.timeOut() 传入时间到时执行的函数
//this.props.style 传入样式
//this.props.className 传入className

class CountDown extends React.Component {
  constructor() {
    super();
    this.state = {
      clocker: "00：00：00"
    };
  }
  componentWillMount() {
    let time =
      (this.props.hours ? this.props.hours : 0) * 60 * 60 +
      (this.props.minutes ? this.props.minutes : 0) * 60 +
      (this.props.seconds ? this.props.seconds : 0);
    this.reduction(time);
    this.timer = setInterval(() => {
      time--;
      this.reduction(time);
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  reduction = time => {
    const _this = this;
    let clocker = "";
    let timeObj = {
      secends: time % 60,
      minutes: Math.floor(time / 60) % 60,
      hours: Math.floor(time / 60 / 60) % 60
    };
    clocker = `${_this.addZero(timeObj.hours)}
              ：${_this.addZero(timeObj.minutes)}
              ：${_this.addZero(timeObj.secends)}`;
    if (time <= 0) {
      clocker = _this.props.msg || `时间到`;
      _this.props.timeOut();
      clearInterval(_this.timer);
    } else if(time==180){
      console.log(545545)
      this.props.lastCount(true)
    }
    this.props.lastCount(false)
    _this.setState({ clocker });
  };
  addZero(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        倒计时：
        {this.state.clocker}
      </div>
    );
  }
}

export default CountDown;
