import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Radio, Input } from "antd"
import "./PayPage.less"

const RadioGroup = Radio.Group;

class PayPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="pay-wrap">
                <HeaderNav name="挑战10秒"/>
                <div>
                    <div>
                        <p>充值金额</p>
                        <p>￥<input type="text"/></p>
                        <p>充值方式</p>
                    </div>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <div>
                            <Radio value={1}><span className="pay-name">快捷支付</span></Radio>
                        </div>
                        <div>
                            <Radio value={2}><span className="pay-name border-pay">快捷支付</span></Radio>
                        </div>
                        <div>
                            <Radio value={3}><span className="pay-name">快捷支付</span></Radio>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default PayPage