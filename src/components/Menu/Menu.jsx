import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { Layout, Menu, Dropdown ,Modal,Icon,message} from  "antd";
import "./Menu.less";
import Login from "~/container/Login/Login.jsx";
import {login_Popup} from '~/action/loginPopup';
import {meun_titles} from '~/action/changeTitle';
import img from "./img/toux.png"
import Api from "~/until/api";
const Header = Layout.Header;
class Headers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible:false,
            current:'1',
            isLogin:false
        }
    }
    componentWillMount(){
        this.setState({
            current:this.props.meun_title
        })
        if(JSON.stringify(this.props.loginReducer) !== '{}'){
            this.setState({
                isLogin:true
            })
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.login_pop,2323)
        if(this.props.login_pop!==nextProps.login_pop){
            this.setState({
                visible:nextProps.login_pop
            })
        }
        if(this.props.meun_title !== nextProps.meun_title){
            this.setState({
                current:nextProps.meun_title
            })
        }
        if(this.props.loginReducer !== nextProps.loginReducer){
            if(JSON.stringify(nextProps.loginReducer) === '{}'){
                this.setState({
                    isLogin:false
                })
            } else {
                this.setState({
                    isLogin:true
                })
            }

        }
       
    }
    logout(){
        Api.logout({}).then((res)=>{
            if(res.status === "1"){
                message.success(res.message)
                sessionStorage.removeItem("loginSession");
                this.setState({
                    isLogin:false
                })
                this.props.dispatch(meun_titles('1'))
                window.location.hash = "Employ/FirstFloor/Index";
            }
        }).catch((res)=>{
            message.error(res.message)
        })
    }
    changeVis(){
        this.props.dispatch(login_Popup(false))
    }
    person(){
        this.props.dispatch(login_Popup(true))
    }

    handleClick=(e, key, keyPath)=>{
        let num =e.key
        this.props.dispatch(meun_titles(num))
        this.setState({
            current:e.key
        })
    }

    render() {
        let menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/Employ/FirstFloor/PersonalAbility">个人能力模型</Link>
                </Menu.Item>
                <Menu.Item>
                    <a
                        target="_blank"
                        href="javascript:;"
                        onClick={()=>this.logout()}
                    >
                        注销
                    </a>
                </Menu.Item>
            </Menu>
        )

        // 重定向到首页
        const hash = window.location.hash;
        if (hash === "#/Employ") {
            window.location.hash ="#/Employ/FirstFloor/Index"
        }

        return (
            <Header
                style={{
                    position: "fixed",
                    zIndex: 5,
                    width: "100%",
                    background: "#000",
                    height: "59px",
                    display:"flex"
                }}
            >
                <div className="logo">乐才就业系统</div>
                <Menu theme="dark"
                      mode="horizontal"
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      style={{
                          lineHeight: "59px",
                          flex:1,
                          height: "59px"
                      }}
                >
                    <Menu.Item key="1">
                        <Link to="/Employ/FirstFloor/Index">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/Employ/FirstFloor/EveryDayPractice">每日练习</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/Employ/FirstFloor/EnterpriseRecruit">企业招聘</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/Employ/FirstFloor/Community">社区</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/Employ/FirstFloor/Appraisal">测评</Link>
                    </Menu.Item>
                </Menu>

                {this.state.isLogin===false?<div style={{color:"#fff",margin:"0 20px",cursor: "pointer"}} onClick={()=>this.person()}>登录</div>:
                    <Dropdown overlay={menu}  trigger={['click']}>
                        <a className="ant-dropdown-link" href="javascript:;" >
                            <img src={img} className='person-info-avater'/>花花 <Icon type="down" style={{marginRight:30}}/>
                        </a>
                    </Dropdown>}

                {/*登录弹出框*/}
                {this.state.visible?<Login onOk={this.changeVis.bind(this)}/>:''}
            </Header>
        );
    }
}
const mapStateToProps = state => {
    const {login_pop,meun_title,loginReducer} = state;
    return {meun_title,login_pop,loginReducer}
};
export default connect(mapStateToProps)(Headers);

