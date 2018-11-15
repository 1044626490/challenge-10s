import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Radio, InputNumber, Button  } from "antd"
import "./PayPage.less"
import connect from "react-redux/es/connect/connect";

const RadioGroup = Radio.Group;
let isWx;
let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
if (ua.match(/MicroMessenger/i) == "micromessenger") {
    isWx = true
}else {
    isWx = false
}
class PayPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            price:null,
            value:0,
        }
    }

    payPrice(){
        console.log(this.state.value.target.value,this.state.price);
        if(this.state.value.target.value === 3){
            if(isWx){
                window.location.href = "http://api.times168.net/index/pay/jsapi_pay?uid="+this.props.userInfo.data.uid+"&price="+this.state.price
            }else {
                window.location.href = "http://api.times168.net/index/pay/recharge?pay_type=pay_wechat&money="+this.state.price+"&uid="+this.props.userInfo.data.uid
            }
        }else if (this.state.value.target.value === 2&&!isWx){
            window.location.href = "http://api.times168.net/index/pay/recharge?pay_type=pay_alipay&money="+this.state.price+"&uid="+this.props.userInfo.data.uid
        }
    }

    render(){
        return(
            <div className="pay-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="pay-container">
                    <div className="pay-price">
                        <p>充值金额</p>
                        <span>￥<InputNumber value={this.state.price} onChange={(value)=>{this.setState({price:value})}}/></span>
                    </div>
                    <RadioGroup onChange={(value)=>{this.setState({value})}} defaultValue={this.state.value}>
                        <span>充值方式</span>
                        {/*<div className="pay">*/}
                            {/*<Radio value={1}><span className="pay-name pay1">快捷支付</span></Radio>*/}
                        {/*</div>*/}
                        {
                            isWx?null:<div className="pay">
                                <Radio value={2}><span className="pay-name border-pay pay2">支付宝</span></Radio>
                            </div>
                        }
                        <div className="pay">
                            <Radio value={3}><span className="pay-name pay3">微信支付</span></Radio>
                        </div>
                    </RadioGroup>
                </div>
                <div className="button-operation">
                    <Button onClick={()=>this.payPrice()} className={this.state.price >= 0.01&&this.state.value?"":"disable"} disabled={!this.state.price||!this.state.value}>下一步</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(PayPage)
// export default PayPage