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
                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                    <path d="M99 315s-100-315-1-2-3-4-5-6-7-8-9-10-11" fill="#464655" p-id="1150"/>
                    {/*<path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.64*/}
                    {/*6-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.6*/}
                    {/*34s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99*/}
                    {/*.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />*/}
                    {/*<path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0*/}
                    {/*-66.064 0Z" fill="#464655" p-id="1150" />*/}
                </svg>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Setting)