import React from "react"
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import "./Activity.less"
import { Button } from "antd"
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';

class Activity extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.getMyCoupon()
    }

    getMyCoupon(){
        Api.coupon().then((res) => {
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="Activity-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="my-active-wrap">
                    <ul>
                        <li>
                            <div className="item-wrap">
                                <div>
                                    <p>￥<span>50</span>体验券</p>
                                    <span>挑战10s体验券</span>
                                </div>
                                <div>
                                    <p>使用时间</p>
                                    <p>09.10-09.11</p>
                                    <Button>立即使用</Button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-wrap">
                                <div>
                                    <p>￥<span>100</span>体验券</p>
                                    <span>新人下单体验券</span>
                                </div>
                                <div>
                                    <p>使用时间</p>
                                    <p>09.10-09.11</p>
                                    <Button>立即使用</Button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default Activity