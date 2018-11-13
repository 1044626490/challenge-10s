import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge, message, Button, Upload} from "antd";
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu"
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import "./PersonalInformation.less"
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "./component/MyInfoModal";
//
class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetName: false,
            myInfo: this.props.userInfo.data,
            isOpenModel:false,
            isResetMyInfo:false,

        }
    }

    componentDidMount(){
        this.getUserInfo()
    }

    getUserInfo = () =>{
        console.log(123123+"sadasdasd")
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            let rate = 0;
            if(res.data.total_office !== 0){
                rate = Math.round(res.data.victory/res.data.total_office);
            }
            this.setState({
                // header:this.props.userInfo.data.avatar,
                // signature:this.props.userInfo.data.signature,
                // myName: this.props.userInfo.data.username,
                myInfo:res.data,
                // victoryRate:rate
            })
        }).catch((err) => {
            message.error(err.msg)
        })
    };

    // resetName(){
    //     if(this.state.myName.length >= 10){
    //         message.warning("长度过长")
    //     }else if(this.state.myName.length === 0){
    //         message.warning("用户名不能为空")
    //     }else {
    //         Api.editUsername({username:this.state.myName}).then((res) =>{
    //             message.success(res.msg);
    //             this.setState({
    //                 isResetName:false
    //             });
    //             this.getUserInfo()
    //         }).catch((err)=>{
    //             message.error(err.msg)
    //         })
    //     }
    // }

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
                                    <p><span>账号：</span><span>
                                        <span className="my-name">{info?info.username:""}</span><span>({info?info.uid:""})</span>&nbsp;&nbsp;
                                        <Icon type="edit" theme="outlined" onClick={()=>{this.setState({isResetMyInfo:true})}}/>
                                    </span>
                                    </p>
                                    <div className="my-level"><span className="class-rank">签名：</span>
                                        <span>
                                            {info?info.signature:""}
                                        </span>
                                        {/*<Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv{info?info.level:1}*/}
                                        </div>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <ul className="bottom-header-list">
                                    <li>
                                        <p>{info?info.gold:0}</p>
                                        <span>金币</span>
                                    </li>
                                    <li>
                                        <p>{info?info.integral:0}</p>
                                        <span>积分</span>
                                    </li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/1"}}>
                                        <div>
                                            <Badge count={info?info.total_friends_request:0} dot={info?info.total_friends_request>99:false} overflowCount={99}>{info?info.total_friends:0}
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
                                <li onClick={()=>this.openModal(true)}>
                                    <p>个人信息</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "#/Dashboard/MyMedal"}}>
                                    <p>我的勋章</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/3"}}>
                                    <p>邀请好友</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>意见或建议（敬请期待）</p><Icon type="right" theme="outlined" />
                                </li>
                            </ul>
                        </div>
                        <div onClick={()=>{window.location.href = "#/Dashboard/Setting"}} className="setting-operation">
                            <p>设置</p><Icon type="right" theme="outlined" />
                        </div>
                    </div>
                </div>
                <BottomMenu />
                {
                    this.state.isOpenModel?<MyInfoModal info={info} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openModal()}
                    changeHeader={()=>this.changeHeader()} isOpenModel={this.state.isOpenModel}
                    getUserInfo={()=>{
                    this.getUserInfo();
                    this.setState({
                    isResetMyInfo:false
                })
                }
                    }
                    />:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(PersonalInformation)