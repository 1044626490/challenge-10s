import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import "./Setting.less"
import { Switch, Modal, Icon, Row, Col, Avatar } from "antd"
import Api from '~/until/api';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import connect from "react-redux/es/connect/connect";
import Sign from "../../Index/Sign/Sign";

class Setting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num:3
        }
    }

    componentDidMount(){

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
                    <li onClick={()=>{Api.loginOut().then(res => {
                        window.location.href = "#"})
                        this.props.dispatch(fetchPostsGetUser())
                    }
                    }><span>退出账号</span></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Setting)