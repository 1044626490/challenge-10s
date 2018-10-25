import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message} from "antd";
import "./index.less"
import connect from "react-redux/es/connect/connect";
// import * as Message from '~/components/common/message'
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import {fetchPostsIfNeeded} from '~/action/login';
//

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOenModal:false,
            intoHomePwd:["","","","","",""],
            // isNeedLogin:false,
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
                    message:"请输入用户账号",
                    placeholder:"用户账号",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[34578]\d{9}$/,
                    isOk:"",
                },
                {
                    key:"password",
                    name:"username",
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
                    message:"请输入用户账号",
                    placeholder:"用户账号",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[34578]\d{9}$/,
                },
                {
                    key:"password",
                    name:"username",
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
            userInfo:this.props.userInfo.data,
            isLogin:this.props.userInfo.msg,
            isHomeNeedPwd:false
            // inputIndex:0,
        };
    }

    componentDidMount(){
        this.getUserInfo()
    }

    getUserInfo = () => {
        Api.getUserInfo().then((res)=>{
            this.setState({
                userInfo:res.data,
                isLogin:true
            })
        }).catch((res)=>{

        })
    };

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

    inputNumber = (button, indexs) => {
        let arr = this.state.intoHomePwd;
        let index = arr.indexOf("");
        console.log(button[indexs],arr);
        index !== -1?arr[index] = button[indexs]:null;
        this.setState({
            intoHomePwd:arr
        })
    };

    resetInput = () => {
        this.setState({
            intoHomePwd:["","","","","",""]
        })
    };

    intoHome(){

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
        name === "loginForm"?this.props.dispatch(fetchPostsIfNeeded(params)).then((res) => {
            if(res.code ==="0000"){
                message.success(res.msg);
                sessionStorage.setItem("key",'2')
                this.getUserInfo()
            }
        }).catch((err) => {
            message.error(err.msg);
        }):Api.register(params).then((res)=>{
            message.success(res.msg)
        }).catch((err)=>{
            message.error(err.msg)
        })
    };

    getKaptchald(){
        let tel = this.state.register.tel;
        let re = /^1[34578]\d{9}$/
        if(re.test(tel)){
            Api.sendVerifiCode({tel}).then((res)=>{
                message.success(res.msg);
            }).catch((res)=>{
                message.error(res.msg);
            })
        }
    }

    render(){
        console.log(this.state.userInfo,this.props);
        const button = ["S","M","H","1","2","3","4","5","6","7","8","9","重输","0","确认"];
        const { userInfo } = this.state;
        const item = ["初级房间","中级房间","高级房间","输入房号"];
        return(
            <div className="index-container">
                <HeaderNav name="挑战10秒"/>
                <div className="head-wrap">
                    <img src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                    <div className="my-info">
                        <span>{userInfo?userInfo.username:""}</span>
                        <br/>
                        <span>ID:{userInfo?userInfo.uid:0}</span>
                    </div>
                    <div className="my-sliver-item">
                        <span>{userInfo?userInfo.silver:0}</span>
                    </div>
                    <div className="my-money-item">
                        <span>{userInfo?userInfo.gold:0}</span>
                        <span className="my-trophy">{null}</span>
                    </div>
                </div>
                <div className="index-container-wrap">
                    {
                        item.map((item, index) => {
                            return <div key={index} className="index-content-item"
                                        onTouchStart={item === "输入房号"?()=>this.openModal(true):
                                            ()=>{window.location.href = "#/Dashboard/NewHome/"+index}}>
                                <span>people-number</span>
                                <p>{item}</p>
                            </div>
                        })
                    }
                </div>
                <div className="game-rule">
                    <div className="game-rule-header">

                    </div>
                    <ul className="game-rule-item">
                        <li>1.游戏规则游戏规则游戏规则</li>
                        <li>2.游戏规则游戏规则游戏规则游戏规则游戏规则游戏规则游戏规则游戏规则游戏规则</li>
                        <li>3.游戏规则游戏规则</li>
                    </ul>
                </div>
                <BottomMenu />
                    <Modal entered={true} visible={this.state.isOenModal||!this.state.isLogin} wrapClassName={"into-home-modal"}
                           closable={false} destroyOnClose={true}
                    >
                        <div className="into-home">
                            <div className="into-home-header">
                                <p>{
                                    !this.state.isLogin?"用户登录":"加入房间"
                                }
                                    {
                                        !this.state.isLogin?null:
                                            <span onTouchStart={()=>this.openModal(false)}>
                                            </span>
                                    }
                                </p>
                            </div>
                            {
                                !this.state.isLogin?
                                    <div className="login-register">
                                        <Tabs defaultActiveKey="1" animated={false} onChange={null}>
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
                                                            <Button onTouchStart={()=>this.handleSubmit("Register")} className="check-button" type="primary">注册</Button>
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
                                                            <Button onTouchStart={()=>this.handleSubmit("loginForm")} className="check-button" type="primary">登录</Button>
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
                                                return <span key={index} className="input-item" onTouchStart={()=>this.inputPwd(index)}>{item}</span>
                                            })
                                        }
                                    </div>
                                    <div className="button-group">
                                        {
                                            button.map((item, index) => {
                                                if(item === "重输"){
                                                    return <button key={index} onTouchStart={()=>this.resetInput()}><img src={require("../../layouts/image/reset.png")} alt=""/></button>
                                                }else if (item === "确认"){
                                                    return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1} onTouchStart={()=>this.intoHome()}>
                                                        <img src={require("../../layouts/image/check.png")} alt=""/>
                                                    </button>
                                                }
                                                if(!this.state.isHomeNeedPwd){
                                                    return <button key={index} onTouchStart={()=>this.inputNumber(button, index)}>
                                                        <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                                    </button>
                                                }else {
                                                    if(index > 2){
                                                        return <button key={index} onTouchStart={()=>this.inputNumber(button, index)}>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(Index)
// export default Index