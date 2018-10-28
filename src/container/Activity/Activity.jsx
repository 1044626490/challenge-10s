import React from "react"
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import "./Activity.less"
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
                <div>

                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default Activity