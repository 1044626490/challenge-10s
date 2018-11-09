import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Radio, InputNumber  } from "antd"
import "./PayPage.less"

const RadioGroup = Radio.Group;

class PayPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            price:null
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
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <span>充值方式</span>
                        <div className="pay">
                            <Radio value={1}><span className="pay-name pay1">快捷支付</span></Radio>
                        </div>
                        <div className="pay">
                            <Radio value={2}><span className="pay-name border-pay pay2">支付宝</span></Radio>
                        </div>
                        <div className="pay">
                            <Radio value={3}><span className="pay-name pay3">微信支付</span></Radio>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default PayPage