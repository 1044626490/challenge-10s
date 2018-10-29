import React from 'react';
import connect from "react-redux/es/connect/connect";
import HeaderNav from "../../components/headerNav/headerNav";
import BottomMenu from "../../components/bottomMenu/bottonMenu";
import { Button, Modal, message } from "antd"
import Api from '~/until/api';
import "./NewHome.less"

class NewHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header:"",
            level:"",
            userInfo:this.props.userInfo.data,
            isCreateHome:false,
            intoHomePwd:["","","","","",""]
        };
    }

    componentDidMount(){
        console.log(this.props.match);
        let id = this.props.match.params.id;
        let header = id === "0"?"初级房间":id === "1"?"中级房间":id === "2"?"高级房间":"";
        let level = 1+id*1;
        this.setState({
            header,
            level
        })
    }

    createHome = () => {
        this.setState({
            isCreateHome:true
        })
    }

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

    radomeHome(){
        Api.radomeJoinRoom({level:this.state.level}).then((res)=>{
            console.log(res)
            message.info("加入房间成功")
            window.location.href = "#/Dashboard/GameHome/"+res.data.room_id
        }).catch((err) => {
            message.info(err.msg)
        })
    }


    finHome = () =>{
        let intoHomePwd = this.state.intoHomePwd;
        if(intoHomePwd.indexOf("") === -1 || intoHomePwd.indexOf("") === 0){
            let params = {
                level:this.state.level,
                homePassword:this.state.intoHomePwd.join("")
            };
            Api.createRoom(params).then((res) => {
                message.info(res.msg);
                console.log(res)
                window.location.href = "#/Dashboard/GameHome/"+res.data.room_id;
            }).catch((err) => {
                message.info(err.msg)
            })
            console.log(params);
        }else {
            message.warning("请输入完整的6位密码")
            return false
        }
    }

    render(){
        const button = [1,2,3,4,5,6,7,8,9,"重输",0,"确认"];
        const { userInfo } = this.state;
        return (
            <div className="into-home">
                <HeaderNav name={this.state.header}/>
                <div>
                    <div className="head-wrap">
                        <img src={userInfo?userInfo.avatar:require("../../layouts/image/head.png")} alt=""/>
                        <div className="my-info">
                            <span>{userInfo?userInfo.username:""}</span>
                            <br/>
                            <span>ID:{userInfo?userInfo.uid:0}</span>
                        </div>
                        <div className="my-money-item">
                            <span>{userInfo?userInfo.gold:0}</span>
                        </div>
                    </div>
                    <div className="go-home-button">
                        <div className="into-home-button">
                            <Button onClick={()=>this.radomeHome()}><p>随机匹配</p></Button>
                        </div>
                        <div className="into-home-button">
                            <Button onTouchStart={()=>this.openModal(true)}><p>创建房间</p></Button>
                        </div>
                    </div>
                </div>
                <BottomMenu />
                <Modal entered={true} visible={this.state.isCreateHome} wrapClassName={"into-home-modal"}
                       closable={false} destroyOnClose={true}>
                    <div className="into-home">
                            <div className="into-home-header">
                                <p>加入房间
                                    <span onTouchStart={()=>this.openModal(false)}>
                                    </span>
                                </p>
                            </div>
                        <div className="modal-content">
                            <div className="into-home-password">
                                <span>请输入口令</span>
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
                                            return <button key={index} disabled={this.state.intoHomePwd.indexOf("") !== -1} onTouchStart={()=>this.finHome()}>
                                                <img src={require("../../layouts/image/check.png")} alt=""/>
                                            </button>
                                        }
                                        return <button key={index} onTouchStart={()=>this.inputNumber(button, index)}>
                                            <img src={require("../../layouts/image/"+item+".png")} alt=""/>
                                        </button>
                                    })
                                }
                            </div>
                        </div>
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
export default connect(mapStateToProps)(NewHome)