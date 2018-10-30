import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import "./Setting.less"
import { Switch } from "antd"

class Setting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="setting-wrap">
                <HeaderNav name="设置"/>
                <ul>
                    <li><span>音乐</span><Switch checkedChildren="on" unCheckedChildren="off" defaultChecked /></li>
                    <li><span>音效</span><Switch checkedChildren="on" unCheckedChildren="off" defaultChecked /></li>
                    <li><span>振动</span><Switch checkedChildren="on" unCheckedChildren="off" defaultChecked /></li>
                    <li><span>屏蔽邀请信息</span><Switch checkedChildren="on" unCheckedChildren="off" defaultChecked={false} /></li>
                    <li><span>清理缓存</span><span className="clear">1.03M</span></li>
                    <li><span>退出账号</span></li>
                </ul>
            </div>
        )
    }
}

export default Setting