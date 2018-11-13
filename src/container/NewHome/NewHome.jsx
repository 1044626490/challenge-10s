import React from 'react';
import connect from "react-redux/es/connect/connect";
import HeaderNav from "../../components/headerNav/headerNav";
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import { Button, Modal, message } from "antd"
import $ from "jquery"
import Api from '~/until/api';
import "./NewHome.less"

let isButton = true;
class NewHome extends React.Component {
    constructor(props) {
        super(props);
        this.home = this.props.match.params.id;
        this.checkBox = this.home === "0"?{value:[500,1000,2000,5000],txt:["500","1k","2k","5k"]}
            :this.home === "1"?{value:[10000,20000,30000,50000],txt:["10k","20k","30k","50k"]}:
                {value:[100000,200000,300000,500000],txt:["100k","200k","300k","500k"]}
        this.state = {
            header:"",
            level:"",
            userInfo:this.props.userInfo.data,
            isCreateHome:false,
            intoHomePwd:["","","","","",""],
            homePrice:this.checkBox.value[0],
            isGoingHome:false,
            createHome:false,
            bool: true
        };
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let header = id === "0"?"初级房间":id === "1"?"中级房间":id === "2"?"高级房间":"";
        let level = 1+id*1;
        this.setState({
            header,
            level
        });
    }

    //是否创建房间
    createHome = () => {
        this.setState({
            isCreateHome:true
        })
    }

    //打开创建房间弹框
    openModal = (isCreateHome) => {
        this.setState({
            isCreateHome
        })
    }

    inputPwd = (index) => {
        let arr = this.state.intoHomePwd;
        arr[index] = "";
        this.setState({
            intoHomePwd:arr,
        })
    };

    //输入创建房间密码
    inputNumber = (button, indexs) => {
        let arr = this.state.intoHomePwd;
        let index = arr.indexOf("");
        index !== -1?arr[index] = button[indexs]:null;
        this.setState({
            intoHomePwd:arr
        })
    };

    //重置输入创建房间密码
    resetInput = () => {
        this.setState({
            intoHomePwd:["","","","","",""]
        })
    };

    //随机进入房间
    radomeHome = (price) =>{
        if(isButton){
            isButton = false;
            // let setT = setTimeout(()=>{
            //     isButton = true;
            //     clearTimeout(setT)
            // },1000)
            if(this.state.createHome){
                let params = {
                    level:this.state.level,
                    homePassword:this.state.intoHomePwd.join(""),
                    room_gold:price
                };
                Api.createRoom(params).then((res) => {
                    isButton = true;
                    message.info(res.msg);
                    window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
                }).catch((err) => {
                    isButton = true;
                    message.info(err.msg)
                });
            }else {
                Api.radomeJoinRoom({level:this.state.level,room_gold:price}).then((res)=>{
                    isButton = true;
                    message.success("加入房间成功");
                    window.location.href = "#/Dashboard/GameHome/"+res.data.room_id+"/1";
                }).catch((err) => {
                    isButton = true
                    message.info(err.msg)
                })
            }
        }
    };

    //创建房间
    finHome = () =>{
        let intoHomePwd = this.state.intoHomePwd;
        if(intoHomePwd.indexOf("") === -1 || intoHomePwd.indexOf("") === 0){
            this.setState({
                isGoingHome:true,
                createHome:true
            });
        }else {
            message.warning("请输入完整的6位密码")
            return false
        }
    };

    render(){
        const button = [1,2,3,4,5,6,7,8,9,"重输",0,"确认"];
        const { userInfo } = this.state;
        return (
            <div className="into-home-wrap">
                <HeaderNav name={this.state.header}/>
                <div>
                    <div className="head-wrap">
                        <img src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                        <div className="my-info">
                            <p>{userInfo?userInfo.username:""}</p>
                            <p>ID:{userInfo?userInfo.uid:0}</p>
                        </div>
                        <div className="my-money-items">
                            <span>{userInfo?userInfo.gold:0}</span>
                        </div>
                    </div>
                    <div className="go-home-button">
                        <div className="into-home-button">
                            <Button onClick={()=>{this.setState({isGoingHome:true})}}><p>随机匹配</p></Button>
                        </div>
                        <div className="into-home-button">
                            <Button onClick={()=>this.openModal(true)}><p>新建房间</p></Button>
                        </div>
                    </div>
                </div>
                {/*<Modal entered={true} visible={this.state.isGoingHome} wrapClassName={"check-apply"}*/}
                       {/*closable={false} destroyOnClose={true} onCancel={()=>{this.setState({isGoingHome:false,createHome:false})}}*/}
                       {/*maskClosable={true} zIndex={99999}>*/}
                    {/*{*/}
                        {/*this.checkBox.value.map((item, index) =>{*/}
                            {/*return <i onClick={()=>{this.setState({homePrice:item})}} onDoubleClick={()=>this.radomeHome(item)}*/}
                                      {/*className={this.state.homePrice === item?"check-active":""}>{this.checkBox.txt[index]}</i>*/}
                        {/*})*/}
                    {/*}*/}
                {/*</Modal>*/}
                {
                    this.state.isGoingHome?<div onClick={()=>{this.setState({isGoingHome:false})}} className="mask-check-apply">
                    </div>:null
                }
                {
                    this.state.isGoingHome?<div className="check-apply">
                        {
                                this.checkBox.value.map((item, index) =>{
                                return <i key={index}
                                className={this.state.homePrice === item?"check-active":""}>
                                    <span onClick={this.state.homePrice === item?
                                        ()=>this.radomeHome(this.state.homePrice):
                                        ()=>{this.setState({homePrice:item})}
                                    }></span>
                                    {this.state.homePrice === item?"确定":this.checkBox.txt[index]}</i>
                            })
                        }
                        {/*<Button onClick={()=>this.radomeHome(this.state.homePrice)}>确定</Button>*/}
                    </div>:null
                }
                <BottomMenu />
                {
                    this.state.isCreateHome?<Modal entered={true} visible={this.state.isCreateHome} wrapClassName={"into-home-modals"}
                    closable={false} destroyOnClose={true}>
                    <div className="into-home">
                    <div className="into-home-header">
                    <p>创建房间
                    <span onClick={()=>this.openModal(false)}>
                    </span>
                    </p>
                    </div>
                    <div className="modal-content">
                    <div className="into-home-password">
                    <span>请设置口令</span>
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
                                return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1&&this.state.intoHomePwd.indexOf("") !== 0} onClick={()=>this.finHome()}>
                                    <img src={require("../../layouts/image/check.png")} alt=""/>
                                </button>
                            }
                            return <button key={index} onClick={()=>this.inputNumber(button, index)}>
                                <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                            </button>
                        })
                    }
                    </div>
                    </div>
                    </div>
                    </Modal>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(NewHome)