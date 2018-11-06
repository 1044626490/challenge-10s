import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import "./Setting.less"
import { Switch, Modal, Icon, Row, Col, Avatar, Popconfirm } from "antd"
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
                    <Popconfirm overlayClassName={"loginout-game-pop"} placement="top" title="确认退出？"
                                onConfirm={null}
                                onCancel={()=>{Api.loginOut().then(res => {
                        window.location.href = "#"})
                        this.props.dispatch(fetchPostsGetUser())
                    }} okText="取消" cancelText="确定">
                        <li><span>退出账号</span></li>
                    </Popconfirm>
                </ul>
                <div className="twinkle-little-star">
                    <div className="star1"><span>
                    </span></div>
                    <div className="star2"><span>
                    </span></div>
                    <div className="star3"><span>
                    </span></div>
                    <div className="star4"><span>
                    </span></div>
                    <div className="win-pc">
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Setting)