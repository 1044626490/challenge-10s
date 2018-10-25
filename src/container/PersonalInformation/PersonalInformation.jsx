import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge} from "antd";
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu"
import HeaderNav from "../../components/headerNav/headerNav";
import "./PersonalInformation.less"
//
class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetName: false,
            myName:"阿里大人",
        };
    }

    resetName(){
        this.setState({
            isResetName:false
        })
    }

    render(){
        return(
            <div className="my-info-container">
                <HeaderNav name="挑战10秒"/>
                <div className="my-info-wrap">
                    <div className="header-pic">
                        <div className="top-header">
                            <Avatar size={64} icon="user" src={require("../../layouts/image/head.png")} />
                            <div className="name-class">
                                <p><span>昵称：</span>{
                                this.state.isResetName? <span>
                                        <Input placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>
                                        {/*<input type="text" onChange={(e)=>{this.setState({myName:e})}}/>*/}
                                    <Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>
                                    <Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>
                                    </span>:
                                    <span>
                                        <span className="my-name">阿里大人</span>&nbsp;&nbsp;
                                        <Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>
                                    </span>
                            }
                                    </p>
                                <p><span className="class-rank">等级：</span><Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv12</p>
                            </div>
                        </div>
                        <div className="bottom-header">
                            <ul className="bottom-header-list">
                                <li>
                                    <p>1234</p>
                                    <span>金币</span>
                                </li>
                                <li>
                                    <p>120</p>
                                    <span>点券</span>
                                </li>
                                <li>
                                    <p>
                                        <Badge count={9} overflowCount={9}>98
                                        </Badge>
                                    </p>
                                    <span>好友</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="my-info-operation">
                        <div className="operation-list">
                            <ul>
                                <li>
                                    <p>个人信息</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>我的勋章</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>邀请好友</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>意见或建议</p><Icon type="right" theme="outlined" />
                                </li>
                            </ul>
                        </div>
                        <div className="setting-operation">
                            <p>设置</p><Icon type="right" theme="outlined" />
                        </div>
                    </div>
                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default PersonalInformation