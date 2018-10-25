import {Icon} from "antd";
import React from "react";
import history from "~/history";
import "./headerNav.less"

class HeaderNav extends React.Component {
    constructor(props) {
        super(props);

    }

    goBackHistory(e){
        console.log(e,window.location.hash);
        window.location.hash === "#/Dashboard/Index"?window.location.href = "#/Dashboard/Index":history.go(-1);
    }

    render() {
        return (
            <div className="top-name">
                <span onClick={(e)=>this.goBackHistory(e)}><Icon type="left" theme="outlined" /><a>返回</a></span>
                <p>
                    {this.props.name}
                </p>
                <Icon type="ellipsis" theme="outlined" />
            </div>
        )
    }
}

export default HeaderNav