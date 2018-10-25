import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge, message} from "antd";
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu"
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import "./PersonalInformation.less"
//
class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetName: false,
            myName: "",
            myInfo: null,
            isOpenModel:false
        }
    }

    getUserInfo = () =>{
        Api.getUserInfo().then((res)=>{
            console.log(res);
            this.setState({
                myInfo:res.data
            })
        }).catch((res)=>{

        })
    }

    componentDidMount(){
        this.getUserInfo()
    }

    resetName(){
        if(this.state.myName.length >= 10){
            message.warning("长度过长")
        }else if(this.state.myName.length === 0){
            message.warning("用户名不能为空")
        }else {
            Api.editUsername({username:this.state.myName}).then((res) =>{
                message.success(res.msg);
                this.setState({
                    isResetName:false
                });
                this.getUserInfo()
            }).catch((err)=>{
                message.error(err.msg)
            })
        }
    }

    openModal = (isOpen) => {
        this.setState({
            isOpenModel:isOpen
        })
    };

    render(){
        const info = this.state.myInfo;

        return(
            <div className="my-info-container">
                <HeaderNav name="挑战10秒"/>
                <div className="my-info-wrap">
                {
                    info?<div className="header-pic">
                            <div className="top-header">
                                <Avatar size={64} icon="user" src={info.avatar||require("../../layouts/image/head.png")} />
                                <div className="name-class">
                                    <p><span>昵称：</span>{
                                        this.state.isResetName&&!this.state.isOpenModel? <span>
                                        <Input maxLength={10} defaultValue={info.username||""} placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>
                                    <Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>
                                    <Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>
                                    </span>:
                                            <span>
                                        <span className="my-name">{info.username||""}</span>&nbsp;&nbsp;
                                                <Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>
                                    </span>
                                    }
                                    </p>
                                    <p><span className="class-rank">等级：</span><Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv{info.level||1}</p>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <ul className="bottom-header-list">
                                    <li>
                                        <p>{info.gold}</p>
                                        <span>金币</span>
                                    </li>
                                    <li>
                                        <p>{info.silver}</p>
                                        <span>银币</span>
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
                        </div>:null
                }
                    <div className="my-info-operation">
                        <div className="operation-list">
                            <ul>
                                <li onTouchStart={()=>this.openModal(true)}>
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
                <Modal entered={true} visible={this.state.isOpenModel} wrapClassName={"into-home-modal my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div>
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>{
                                    this.state.isResetName? <span>
                                        <Input placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>
                                            {/*<input type="text" onChange={(e)=>{this.setState({myName:e})}}/>*/}
                                            <Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>
                                    <Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>
                                    </span>:
                                        <span>
                                        <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                            <Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>
                                    </span>
                                }
                                </p>
                                <p>
                                    ID:{info?info.uid:0}
                                </p>
                                <div className="my-account">
                                    <span>我的账号：</span><span></span>
                                </div>
                            </div>
                        </div>
                        <div className="my-class-medal">
                            <div className="my-class my-progress">
                                <p>等级:(12/32)</p>
                                <img src={require("../../layouts/image/star.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                            <div className="my-medal my-progress">
                                <p>勋章数:(3/16)</p>
                                <img src={require("../../layouts/image/medal1.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                        </div>
                    </div>
                    <Icon onTouchStart={()=>this.openModal(false)} type="close-circle" theme="outlined" />
                </Modal>
            </div>
        )
    }
}

export default PersonalInformation