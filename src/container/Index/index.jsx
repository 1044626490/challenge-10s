import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge, Progress} from "antd";
import "./index.less"
import connect from "react-redux/es/connect/connect";
// import * as Message from '~/components/common/message'
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import {fetchPostsIfNeeded} from '~/action/login';
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "../PersonalInformation/component/MyInfoModal";
import Sign from "./Sign/Sign"
import MyTask from "./MyTask/MyTask";
import $ from "jquery";
//

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
// let browser = {
//     versions: function () {
//         let u = navigator.userAgent, app = navigator.appVersion;
//         return {         //移动终端浏览器版本信息
//             trident: u.indexOf('Trident') > -1, //IE内核
//             presto: u.indexOf('Presto') > -1, //opera内核
//             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//             mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//             iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//             iPad: u.indexOf('iPad') > -1, //是否iPad
//             webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//         };
//     }(),
//     language: (navigator.browserLanguage || navigator.language).toLowerCase()
// }
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.webSocket = new WebSocket("ws://api.times168.net:8282");
        this.setI = null;
        this.state = {
            isOenModal:false,
            intoHomePwd:["","","","","",""],
            // isNeedLogin:false,
            progress:0,
            login:{
                tel:null,
                password:null
            },
            register:{
                tel:null,
                password:null,
                newpassword:null,
                code:null
            },
            loginForm:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[345789]\d{9}$/,
                    isOk:"",
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                }
            ],
            Register:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[345789]\d{9}$/,
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"newpassword",
                    name:"newpassword",
                    required:true,
                    message:"请确认密码",
                    placeholder:"确认密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"code",
                    name:"code",
                    required:true,
                    message:"请输入验证码",
                    placeholder:"验证码",
                    isOk:"",
                    before:<Icon className="before-icon" type="safety-certificate" theme="outlined" />
                }
            ],
            userInfo:false,
            isLogin:false,
            isHomeNeedPwd:false,
            homeId:"",
            isResetMyInfo:false,
            isOpenModel:false,
            isOpenInfoModel:false,
            isOpenMask:false,
            loginLocation:"2",
            isOpenSign:false,
            isOpenMyTask:false,
            myInvite:localStorage.getItem("inviteData")?localStorage.getItem("inviteData").split(";"):[],
            userNum:{high: 0,middle: 0,primary: 0}
            // inputIndex:0,
        };
    }

    componentDidMount(){
        console.log(123123)
        if(window.location.hash.indexOf("#/Dashboard/index") >= 0){
            this.getUserInfo();
        }
    }

    getWebsocket = (res) =>{
        let data = JSON.stringify({
            "type": "bind",
            "uid": res.data.uid,
        });
        this.webSocket.send(data);
        this.webSocket.onmessage = (e)=> {
            let data = JSON.parse(e.data);
            let userData = data.data;
            let type = data.type || "";
            switch (type) {
                case "bind":
                    // localStorage.setItem("inviteData",this.state.myInvite);
                    break;
                case 'invite':
                    let arr = localStorage.getItem("inviteData");
                    if (arr&&arr.length > 0){
                        if(arr.indexOf(JSON.stringify(userData)) >= 0){
                            return false
                        }
                        if(arr.indexOf(";") > 0){
                            if(arr.split(";").length === 5){
                                let arr1 = arr.concat(";"+JSON.stringify(userData));
                                let arr2 = arr1.split(";");
                                arr = arr2.slice(1,6);
                                arr1 = arr.join(";");
                                arr = arr1
                            }else {
                                // let arr1 = arr.split(";")
                                // arr = arr1.push(JSON.stringify(userData))
                                let arr1 = arr.concat(";"+JSON.stringify(userData))
                                arr = arr1
                            }
                        }else {
                            let arr1 = [arr];
                            arr1.push(JSON.stringify(userData));
                            arr = arr1.join(";")
                        }
                    } else {
                        arr = JSON.stringify(userData);
                    }
                    localStorage.setItem("inviteData",arr);
                    if(arr.indexOf(";") < 0){
                        let arr1 = [arr]
                        arr = arr1
                    }else {
                        arr = arr.split(";")
                    }
                    this.setState({
                        myInvite:arr
                    })
                    break;
            }
        }
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.props === nextProps&&this.state === nextState){
    //         return false
    //     }else {
    //         return true
    //     }
    // }

    getUserInfo = () => {
        console.log(123123)
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            let hash = window.location.hash;
            let reg2 = /([^=]+)$/;
            let openid = hash.match(reg2);
            let params = null;
            let code = this.props.userInfo.code
            if (hash.indexOf("?oid=") >= 0) {
                params = {openid: openid[0]}
                localStorage.setItem("oid",openid[0])
                // window.location.href = "#/Dashboard/index"
                // if(code === "0000"){
                //
                // }
            }else {
                if (localStorage.getItem("oid")) {
                    params = {openid: localStorage.getItem("oid")}
                }
            }
            console.log(params)
            if (hash.indexOf("#/Dashboard/index") >= 0) {
                this.props.dispatch(fetchPostsGetUser(params)).then((res) => {
                    this.setState({
                        isLogin: false,
                        userInfo: res.data
                    });
                    Api.onlineUser().then(res => {
                        this.setState({
                            userNum: res.data
                        })
                    });
                    this.setI = setInterval(() => {
                        Api.onlineUser().then(res => {
                            this.setState({
                                userNum: res.data
                            })
                        })
                    }, 60000);
                    console.log(res)
                    // hash.indexOf("?uid=") >= 0 ?window.location.href = "#/Dashboard/index":null;
                    this.getWebsocket(res);
                }).catch((err) => {
                    code === "0000"&&localStorage.getItem("oid")?null:hash.indexOf("?uid=") >= 0 ?
                        window.location.href = 'http://api.times168.net/index/wxlogin/login?refer_id=' + openid[0] :
                        window.location.href = 'http://api.times168.net/index/wxlogin/login'
                })
            }
        }else {}
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            this.setState({
                isLogin: false,
                userInfo: res.data
            });
            Api.onlineUser().then(res => {
                this.setState({
                    userNum: res.data
                })
            })
            this.setI = setInterval(() => {
                Api.onlineUser().then(res => {
                    this.setState({
                        userNum: res.data
                    })
                })
            }, 60000);
            this.getWebsocket(res);
        }).catch((err) => {
            this.props.userInfo.code === "0000" ? null :
                this.setState({
                    isLogin: true,
                })
        })

    }

    inputPwd = (index) => {
        let arr = this.state.intoHomePwd;
        arr[index] = "";
        this.setState({
            intoHomePwd:arr,
        })
    };

    openModal = (isOk) => {
        this.setState({
            isOenModal:isOk,
            intoHomePwd:["","","","","",""]
        })
    };

    componentWillUnmount(){
        this.webSocket.close()
        clearInterval(this.setI)
    }

    inputNumber = (button, indexs) => {
        let arr = this.state.intoHomePwd;
        let index = arr.indexOf("");
        if(!this.state.isHomeNeedPwd){
            if(!isNaN(button[indexs])){
                if(index > 0){
                    index !== -1?arr[index] = button[indexs]:null;
                    this.setState({
                        intoHomePwd:arr
                    })
                }else if(this.state.intoHomePwd.indexOf("") === 0){
                    message.warning("请先输入房间等级“S”“M”“H”")
                }
            }else {
                if(index === 0){
                    index !== -1?arr[index] = button[indexs]:null;
                    this.setState({
                        intoHomePwd:arr
                    })
                }else {
                    message.warning("后5位只能为数字")
                }
            }
        }else {
            arr[index] = button[indexs];
            this.setState({
                intoHomePwd:arr
            })
        }
    };

    resetInput = () => {
        this.setState({
            intoHomePwd:["","","","","",""]
        })
    };

    intoHome(){
        if(this.state.isHomeNeedPwd){
            Api.confirmRoomPass({room_id:this.state.homeId,homePassword: this.state.intoHomePwd.join("")}).then((res)=>{
                window.location.href = "#/Dashboard/GameHome/"+this.state.homeId+"/1"
            }).catch((err)=>{
                message.info(err.msg)
            })
        }
        Api.joinRoomId({room_id: this.state.intoHomePwd.join("")}).then((res)=>{
            message.info(res.msg);
            if(res.code === "0000"){
                window.location.href = "#/Dashboard/GameHome/"+this.state.intoHomePwd.join("")+"/1"
            }
        }).catch((err)=>{
            message.info(err.msg);
            if(err.code === "30002"){
                message.info(err.msg)
                this.setState({
                    homeId:this.state.intoHomePwd.join(""),
                    intoHomePwd:["","","","","",""],
                    isHomeNeedPwd:true
                })
            }
        })
    }

    goFirstHome(index){

    }

    changeInput = (e, item, index, name1) => {
        let value =e.target.value;
        let arr = name1 === "login"?this.state.loginForm:this.state.Register;
        let name2 = name1 === "login"?"loginForm":"Register";
        let name = item.key;
        let form = this.state[name1];
        if(item.re){
            if(item.re.test(value)){
                arr[index].isOk = "success";
                form[name] = value;
            }else {
                arr[index].isOk = "error";
            }
        }else {
            if(value === ""||!value){
                arr[index].isOk = "error";
            }else {
                form[name] = value;
                arr[index].isOk = "success";
            }
        }
        if(item.key === "newpassword"){
            if(value !== this.state.register.password){
                arr[index].isOk = "error";
            }else {
                arr[index].isOk = "success";
            }
        }
        this.setState({
            [name2]:arr,
            [name1]:form
        })
    };

    handleSubmit = (name) => {
        let count = 0;
        this.state[name].map((item, index)=>{
            if(item.isOk === "error"){
                count ++
            }
        });
        if(count > 0){
            message.error("信息填写错误");
            return false
        }
        let params = name === "loginForm"?this.state.login:this.state.register;
        if(name !== "loginForm"){
            let hash = window.location.hash;
            if(hash.indexOf("?uid=")){
                let reg2 = /([^=]+)$/;
                let openid = hash.match(reg2);
                params.refer_id = openid[0]
            }
        }
        name === "loginForm"?this.props.dispatch(fetchPostsIfNeeded(params)).then((res) => {
            if(res.code ==="0000"){
                message.success(res.msg);
                sessionStorage.setItem("key",'2');
                this.getUserInfo()
            }
        }).catch((err) => {
            message.error(err.msg);
        }):Api.register(params).then((res)=>{
            message.success(123123132);
            // message.success(res.msg);
            this.setState({
                loginLocation:"2"
            })
        }).catch((err)=>{
            message.error(err.msg)
        })
    };

    getKaptchald(){
        let tel = this.state.register.tel;
        let re = /^1[345789]\d{9}$/
        if(re.test(tel)){
            Api.sendVerifiCode({tel}).then((res)=>{
                message.success(res.msg);
            }).catch((res)=>{
                message.error(res.msg);
            })
        }
    }

    //打开个人信息
    openInfoModal = (isOpen) => {
        this.setState({
            isOpenInfoModel:isOpen
        })
    };

    //接受邀请
    inviteFriend(index,item){
        Api.inviteFriendJoin({room_id:item.room_id}).then(res => {
            let arr = this.state.myInvite;
            arr.splice(index);
            localStorage.setItem("inviteData",arr.join(";"));
            message.success(res.msg);
            // this.webSocket.close();
            window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1"
        }).catch(err =>{
            let arr = this.state.myInvite;
            arr.splice(index);
            this.setState({
                myInvite:arr
            });
            localStorage.setItem("inviteData",arr.join(";"));
            message.info(err.msg)
        })
    }

    //观战
    watchGame(e,level){
        e.stopPropagation();
        e.cancelBubble = true;
        Api.watchGame({room_level:level+1}).then(res =>{
            window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/0"
        }).catch(err =>{
            message.info(err.msg)
            return false
        })
    }

    //拒绝邀请
    refuseInvite = (index) => {
        let arr = this.state.myInvite;
        arr.splice(index);
        this.setState({
            myInvite:arr
        });
        localStorage.setItem("inviteData",arr.join(";"));
    };

    render(){
        const button = ["S","M","H","1","2","3","4","5","6","7","8","9","重输","0","确认"];
        const userInfo = this.props.userInfo.data;
        const item = ["初级房间","中级房间","高级房间","输入房号"];
        return(
            <div className="index-container">
                <HeaderNav name="挑战10秒"/>
                {
                    this.state.isOpenMask?<div className="mask"></div>:null
                }
                {
                    this.state.isOpenSign?<Sign hasSign={this.state.userInfo.is_sign} closeSign={()=>{this.setState({isOpenSign:false})}}
                                                getUserInfo={()=>this.getUserInfo()} isOpenSign={this.state.isOpenSign}/>:null
                }
                <div className="random-invite">
                    {
                        !this.state.isOpenMask?<Badge dot={this.state.myInvite&&this.state.myInvite.length?true:false}>
                            <span onClick={()=>this.setState({isOpenMask:true})} className="invite-hide">
                            </span>
                        </Badge>:<span onClick={()=>this.setState({isOpenMask:false})} className="invite-close">
                        </span>
                    }
                </div>
                {
                    this.state.isOpenMask?<div className="random-invite-info">
                        {
                            this.state.myInvite.length?this.state.myInvite.map((item, index) =>{
                                return <p key={index}><span className={JSON.parse(item).is_friend?"message friend-message":"message"}>[{JSON.parse(item).room_id}]</span>
                                    : {JSON.parse(item).is_friend?"好友":"玩家"}“{JSON.parse(item).username}”邀请你入房
                                    <span onClick={()=>this.inviteFriend(index,JSON.parse(item))} className="message">接受</span>
                                    <span onClick={()=>this.refuseInvite(index)}>拒绝</span></p>
                            }):<p>
                                <span>暂无消息...</span>
                            </p>
                        }
                    </div>:null
                }
                <div className="head-wrap">
                    <img onClick={()=>this.openInfoModal(true)} src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:""}</span>
                        <br/>
                        <span>ID:{userInfo?userInfo.uid:0}</span>
                    </div>
                    <div className="my-money-item">
                        <span>{userInfo?userInfo.gold:0}</span>
                        <span className="my-money-item-pay" onClick={()=>{window.location.href = "#/Dashboard/PayPage"}}>{null}</span>
                        <span onClick={()=>{window.location.href = "#/Dashboard/RankList"}} className="my-trophy">{null}</span>
                        <span onClick={()=>{this.setState({isOpenMyTask:true})}} className="my-trophy my-task">{null}</span>
                        <span className="my-trophy relief-payment">{null}</span>
                        <span onClick={()=>{this.setState({isOpenSign:true})}} className={this.state.userInfo.is_sign?"my-trophy sign-in has-sign":"my-trophy sign-in"}>{null}</span>
                    </div>
                </div>
                <div className="index-container-wrap">
                    {
                        item.map((item, index) => {
                            return <div key={index} className="index-content-item"
                                        onClick={item === "输入房号"?()=>this.openModal(true):
                                            ()=>{window.location.href = "#/Dashboard/NewHome/"+index}}>
                                {item !== "输入房号"?<span>{index === 0?this.state.userNum.primary:index === 1?this.state.userNum.middle:this.state.userNum.high}</span>:null}
                                {item !== "输入房号"?<i onClick={(e)=>this.watchGame(e,index)} className="eyes-game">
                                    <img src={require("../../layouts/image/eyes.png")} alt=""/>
                                </i>:null}
                                <p>{item}</p>
                            </div>
                        })
                    }
                </div>
                <div className="game-rule">
                    <div className="game-rule-header">

                    </div>
                    <ul className="game-rule-item">
                        <li>1.金币可通过每日任务、每日签到、对战、充值获得，破产后也可领取救济金</li>
                        <li>2.游戏3人以下对战，最接近10秒的玩家获胜；3人以上，前三获胜
                            （金币分配：第一名50%，第二名30%，第三名20%，平局则并列平分该名次、金币）。</li>
                        <li>3.游戏结束后可选择直接退出，或者再来一局。</li>
                        <li>4. 房间设有观战模式。玩家可进入房间旁观高手对战
                            {/*，对战玩家退出时也可抢座参与游戏*/}
                            。</li>
                    </ul>
                </div>
                <BottomMenu />
                <Modal entered={true} visible={this.state.isOenModal||this.state.isLogin} wrapClassName={"into-home-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="into-home">
                        <div className="into-home-header">
                            <p>{
                                this.state.isLogin?"用户登录":"加入房间"
                            }
                                {
                                    this.state.isLogin?null:
                                        <span onClick={()=>this.openModal(false)}>
                                            </span>
                                }
                            </p>
                        </div>
                        {
                            this.state.isLogin?
                                <div className="login-register">
                                    <Tabs activeKey={this.state.loginLocation} animated={false} onChange={(value)=>{this.setState({loginLocation:value})}}>
                                        <TabPane tab="新用户注册" key="1">
                                            <div>
                                                <Form>
                                                    {
                                                        this.state.Register.map((item, index)=>{
                                                            return <FormItem
                                                                required
                                                                hasFeedback
                                                                validateStatus={item.key !== "code"?item.isOk:""}
                                                                help={item.isOk === "error"?item.message:null}
                                                                key={index}
                                                            >
                                                                {item.before}<Input type={item.key === "password"||item.key === "newpassword"?"password":"text"} className={item.key === "code"?"kaptchald":null}
                                                                                    onChange={(e)=>this.changeInput(e,item,index,"register")}
                                                                                    placeholder={item.placeholder}
                                                                                    id={item.isOk}/>
                                                                {
                                                                    item.key === "code"?
                                                                        <Button onClick={()=>this.getKaptchald()} className="get-kaptchald" type="primary">获取验证码</Button>
                                                                        :null
                                                                }
                                                            </FormItem>
                                                        })
                                                    }
                                                    <FormItem>
                                                        <Button onClick={()=>this.handleSubmit("Register")} className="check-button" type="primary">注册</Button>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="老用户登录" key="2">
                                            <div>
                                                <Form>
                                                    {
                                                        this.state.loginForm.map((item, index)=>{
                                                            return <FormItem
                                                                required
                                                                hasFeedback
                                                                validateStatus={item.key !== "code"?item.isOk:""}
                                                                help={item.isOk === "error"?item.message:null}
                                                                key={index}
                                                            >
                                                                {item.before}<Input type={item.key === "password"?"password":"text"}
                                                                                    onChange={(e)=>this.changeInput(e,item,index,"login")}
                                                                                    placeholder={item.placeholder}
                                                                                    id={item.isOk}/>
                                                            </FormItem>
                                                        })
                                                    }
                                                    <FormItem>
                                                        <Button onClick={()=>this.handleSubmit("loginForm")} onClick={()=>this.handleSubmit("loginForm")} className="check-button" type="primary">登录</Button>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </div>
                                :<div className="modal-content">
                                    <div className={this.state.isHomeNeedPwd?"into-home-password input-commad":"into-home-password"}>
                                        <span>{this.state.isHomeNeedPwd?"请输入口令":"请输入房间号"}</span>
                                        {
                                            this.state.intoHomePwd.map((item, index)=>{
                                                return <span key={index} className="input-item" onClick={()=>this.inputPwd(index)}>{item}</span>
                                            })
                                        }
                                    </div>
                                    <div className="button-group">
                                        {
                                            button.map((item, index) => {
                                                if(item === "重输"){
                                                    return <button key={index} onClick={()=>this.resetInput()}><img src={require("../../layouts/image/reset.png")} alt=""/></button>
                                                }else if (item === "确认"){
                                                    return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1} onClick={()=>this.intoHome()}>
                                                        <img src={require("../../layouts/image/check.png")} alt=""/>
                                                    </button>
                                                }
                                                if(!this.state.isHomeNeedPwd){
                                                    return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                                        <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                                    </button>
                                                }else {
                                                    if(index > 2){
                                                        return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                                            <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                                        </button>
                                                    }
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </Modal>
                {
                    this.props.userInfo.code === "0000"?<MyInfoModal info={this.props.userInfo.data} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openInfoModal()}
                                                                     isOpenModel={this.state.isOpenInfoModel}
                                                                     getUserInfo={()=>{
                                                                         this.getUserInfo();
                                                                         this.setState({
                                                                             isResetMyInfo:false
                                                                         })
                                                                     }}
                    />:null
                }
                {
                    this.state.isOpenMyTask?<MyTask isOpenMyTask={this.state.isOpenMyTask} closeMyTask={()=>{this.setState({isOpenMyTask:false})}}/>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Index)