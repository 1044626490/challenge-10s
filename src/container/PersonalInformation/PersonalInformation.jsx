import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge, message, Button} from "antd";
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
            myInfo: this.props.userInfo.data,
            isOpenModel:false,
            isResetMyInfo:false
        }
    }

    // getUserInfo = () =>{
    //     Api.getUserInfo().then((res)=>{
    //         console.log(res);
    //         this.setState({
    //             myInfo:res.data
    //         })
    //     }).catch((res)=>{
    //
    //     })
    // }

    // componentDidMount(){
    //     this.getUserInfo()
    // }

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
                    <div className="header-pic">
                            <div className="top-header">
                                <Avatar size={64} icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                                <div className="name-class">
                                    <p><span>昵称：</span>{
                                        this.state.isResetName&&!this.state.isOpenModel? <span>
                                        <Input maxLength={10} defaultValue={info?info.username:""} placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>
                                    <Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>
                                    <Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>
                                    </span>:
                                            <span>
                                        <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                                <Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>
                                    </span>
                                    }
                                    </p>
                                    <div className="my-level"><span className="class-rank">等级：</span><Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv{info?info.level:1}</div>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <ul className="bottom-header-list">
                                    <li>
                                        <p>{info?info.gold:0}</p>
                                        <span>金币</span>
                                    </li>
                                    <li>
                                        <p>{info?info.silver:0}</p>
                                        <span>银币</span>
                                    </li>
                                    <li>
                                        <div>
                                            <Badge count={9} overflowCount={9}>98
                                            </Badge>
                                        </div>
                                        <span>好友</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div className="my-info-operation">
                        <div className="operation-list">
                            <ul>
                                <li onTouchStart={()=>this.openModal(true)}>
                                    <p>个人信息</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>我的勋章</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onTouchStart={()=>{window.location.href = "#/Dashboard/MyFriend/3"}}>
                                    <p>邀请好友</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>意见或建议</p><Icon type="right" theme="outlined" />
                                </li>
                            </ul>
                        </div>
                        <div onTouchStart={()=>{window.location.href = "#/Dashboard/Setting"}} className="setting-operation">
                            <p>设置</p><Icon type="right" theme="outlined" />
                        </div>
                    </div>
                </div>
                <BottomMenu />
                <Modal entered={true} visible={this.state.isOpenModel} wrapClassName={"my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div>
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>
                                    {/*{*/}
                                    {/*this.state.isResetName? */}
                                        {/*<span>*/}
                                            {/*<Input placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>*/}
                                            {/*<Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>*/}
                                            {/*<Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>*/}
                                        {/*</span>:*/}
                                        {/*<span>*/}
                                            {/*<span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;*/}
                                            {/*<Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>*/}
                                        {/*</span>*/}
                                    {/*}*/}
                                    <span>
                                    <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                    {/*<Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>*/}
                                    </span>
                                </p>
                                <p>
                                    签名：{info?info.uid:0}
                                </p>
                                <p>
                                    胜负：{info?info.uid:0}
                                    <Button className="open-reset-modal" onTouchStart={()=>{this.setState({
                                        isResetMyInfo:true
                                    })}}>编辑</Button>
                                </p>
                            </div>
                            <div className="my-account">
                                <span>我的账号：</span><span></span>
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
                <Modal entered={true} visible={this.state.isResetMyInfo} wrapClassName={"my-info-modal reset-my-info"}
                              closable={false} destroyOnClose={true}>
                    <p className="reset-my-info-container">编辑资料
                        <Icon type="close" theme="outlined" onTouchStart={()=>{this.setState({
                            isResetMyInfo:false
                        })}}/>
                    </p>
                    <div className="reset-info-item">
                        <div>
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                        </div>
                        <div>
                            <Button className="reset-myhead">更换头像</Button>
                        </div>
                        <div>
                            <span>昵称：</span><Input />
                        </div>
                        <div>
                            <span>签名：</span><Input />
                        </div>
                        <div className="bind-item">
                            <span>绑定：</span><span className="binding"></span>
                        </div>
                        <Button className="save-reset">保存</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(PersonalInformation)