import React from "react"
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import "./Activity.less"
import HeaderNav from "../../components/headerNav/headerNav";

class Activity extends React.Component{
    constructor(props) {
        super(props);

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