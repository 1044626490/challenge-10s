import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Modal, Avatar, Button, Drawer, Icon, Popconfirm } from "antd"
import connect from "react-redux/es/connect/connect";
import "./GameHome.less"

// let userInfo = []
let backTime = 3;
let setI2;
class GameHome extends React.Component{
    constructor(props) {
        super(props);
        this.ws = new WebSocket("ws://www.10sgame.com:8282");
        this.state = {
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data,
            homeId:null,
            userData:[],
            isHomeowner:false,
            isStartGame:false,
            isReadyGame:false,
            backTime:3,
            tenSeconds:"0",
            millisecond:"0",
            isStartTime:false,
            isOpenPlayer:false,
            playerInfo:[],
            level:"初级",
            isOpenMask:false
        }
    }

    componentDidMount(){
        let homeId = this.props.match.params.homeId;
        this.getWebSocket(homeId);
        let level = homeId === "1"?"初级":homeId === "2"?"中级":"高级"
        this.setState({
            homeId,
            level
        })
    }

    getWebSocket = (homeId) => {
        let level = homeId.slice(0,1);
        let level1 = level === "S"?1:level === "M"?2:3;
        this.ws.onopen = ()=>{
            // let data = '{"type":"join_room","uid":1,"room_id":123456,"level_room":1}'
            let data = JSON.stringify({"type":"join_room","uid":this.props.userInfo.data.uid,"room_id":homeId,"level_room":level1});
            this.ws.send(data)
        };
        this.ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data
            let type = data.type || "";
            switch (type) {
                case "ping":

                    break;

                case 'active':
                    // let user_data = JSON.parse(data.data);
                    break;

                case 'leave':
                    // let user_datas = JSON.parse(data.data);
                    break;
                default:
                    break;
            }
            if(userData){
                if(userData.length){
                    let id = this.state.userInfo.uid;
                    for(let i=0;i<userData.length;i++){
                        if(id === userData[i].uid){
                            this.setState({
                                isHomeowner:userData[i].is_homeowner
                            })
                        }
                    }
                    let length = userData.length
                    for(let i = length;i < 6;i++){
                        userData.push({})
                    }
                    this.setState({
                        userData
                    })
                }else {
                    let arr = [];
                    arr[0] = userData["0"];
                    arr[0].is_homeowner = userData.is_homeowner;
                    for(let i = 1;i < 6;i++){
                        arr.push({})
                    }
                    this.setState({
                        isHomeowner:true,
                        userData:arr
                    })
                }
            }
            console.log(data)
        }
    }

    componentWillUnmount(){
        this.ws.close()
    }

    startGame = () => {
        this.setState({
            isReadyGame:true,
            isOpenMask:false
        });
        let setI = setTimeout(()=>{
            this.setState({
                isStartGame:true
            });

            clearTimeout(setI)
        },100)
    };

    backTime = () =>{
        let arr = [];
        let setI2 = setInterval(()=>{
            this.setState({
                backTime:--backTime
            });
            if(this.state.backTime <= 0 ){
                clearInterval(setI2)
            }
        },1000);
    };

    timeGoOn = () =>{
        let millisecond = Number(this.state.millisecond);
        let tenSeconds = Number(this.state.tenSeconds);
        this.setState({
            isStartTime:true
        })
        setI2 = setInterval(()=>{
            millisecond++;
            if(millisecond === 100){
                millisecond = 0
            }
            if(millisecond === 0){
                tenSeconds++
            }
            if(tenSeconds === 20){
                clearInterval(setI2)
            }
            this.setState({
                millisecond:millisecond.toString(),
                tenSeconds:tenSeconds.toString()
            })
        },10)
    };

    openPlayerInfo(){
        this.setState({
            isOpenPlayer:true
        })
    }

    render(){
        if(!this.state.isStartTime&&this.state.isStartGame&&this.state.backTime <= 0&&this.state.millisecond === "0"&&this.state.tenSeconds === "0"){
            this.timeGoOn()
        }
        return(
            <div className="game-home-wrap">
                <HeaderNav name={"["+this.state.homeId+"]"}/>
                {
                    !this.state.isReadyGame?
                <div>
                    {
                        this.state.isOpenMask?<div className="mask"></div>:null
                    }
                    <div className="game-home-header">
                        <Avatar icon="user" src={this.props.userInfo.data.avatar||require("../../layouts/image/head.png")} alt=""/>
                        <p>
                            <span>{this.state.userInfo.username}{this.state.isHomeowner?<span className="is-homeowner">房主</span>:null}</span>
                        </p>
                    </div>
                    <div className="game-menber">
                        <span className="game-menber-header">
                            <span>
                                {this.state.homeId}
                            </span>
                        </span>
                        <div className="game-menber-content">
                            <ul>
                                {
                                    this.state.userData&&this.state.userData.map((item ,index) => {
                                        if(item.is_homeowner === 1){
                                            return <li key={index} className="home">
                                                    <Avatar onTouchStart={()=>this.openPlayerInfo()} icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                    <span className="is-homeowner">房主</span>
                                                </li>
                                        }
                                        return <li key={index}>
                                            <Avatar icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                        </li>
                                    })
                                }
                            </ul>
                            <div className="start-game-pop">
                                <Popconfirm overlayClassName={"start-game-pop"}
                                            placement="top" title={"确认开始"}
                                            onCancel={()=>this.startGame()}
                                            onConfirm={()=>{this.setState({isOpenMask:false})}}
                                            okText="取消"
                                            cancelText="确认">
                                    <Button onClick={()=>{this.setState({isOpenMask:true})}} disabled={false}>开始游戏</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="menber-item">

                        </div>
                    </div>
                </div>
                :<div>
                        <div className="game-start-menber-content">
                            <div className="time-goeson">
                                <div>
                                    <img src={this.state.tenSeconds < 10?
                                        require("../../layouts/image/timego/0.png"):
                                        require("../../layouts/image/timego/"+this.state.tenSeconds[0]+".png")}
                                         alt=""/>
                                </div>
                                <div>
                                    <img src={require("../../layouts/image/timego/"+this.state.tenSeconds.slice(this.state.tenSeconds.length-1,this.state.tenSeconds.length)+".png")}
                                         alt=""/>
                                </div>
                                <span className="point">:</span>
                                <div>
                                    <img src={this.state.millisecond < 10?
                                    require("../../layouts/image/timego/0.png"):
                                    require("../../layouts/image/timego/"+this.state.millisecond[0]+".png")}
                                          alt=""/>
                                </div>
                                <div>
                                    <img src={require("../../layouts/image/timego/"+this.state.millisecond.slice(this.state.millisecond.length-1,this.state.millisecond.length)+".png")}
                                         alt=""/>
                                </div>
                                <p className="stop-game">
                                    {this.state.tenSeconds >= 5?<Button onClick={()=>{clearInterval(setI2)}}>停止</Button>:null}
                                </p>
                            </div>
                            {
                                this.state.isStartGame&&this.state.backTime === 3?this.backTime():null
                            }
                            {
                                this.state.isStartGame&&this.state.backTime > 0?<div className="game-back-time">
                                    <img className={"game-back-time"+this.state.backTime} src={require("../../layouts/image/back"+this.state.backTime+".png")} alt=""/>
                                </div>:null
                            }
                            <ul className={this.state.isStartGame?"game-start":null}>
                                {
                                    this.state.userData&&this.state.userData.map((item ,index) => {
                                        if(item.is_homeowner === 1){
                                            return <li key={index} className="home">
                                                <Avatar icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                <span className="is-homeowner">房主</span>
                                            </li>
                                        }
                                        return <li key={index}>
                                            <Avatar icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                }
                <Drawer
                    title=""
                    maskClosable={false}
                    closable={false}
                    onClose={this.onClose}
                    visible={false}
                    className="bottom-pour"
                    placement="bottom"
                >
                    <p className="up">
                        <span></span>
                    </p>
                    <p className="home-name"><span>{this.state.level}房间</span></p>
                    <p className="into-home-price"><img className="into-home-price-icon" src={require("../../layouts/image/homePage_icon.png")}/><span>入场费：</span><span>100金币</span></p>
                    <div className="button-operation">
                        <Button>进入房间</Button>
                        <Button>前往押注</Button>
                    </div>
                </Drawer>
                <Modal entered={true} visible={this.state.isOpenPlayer}  wrapClassName={"all-modal open-player-info"}
                        closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onTouchStart={()=>{this.setState({isOpenPlayer:false})}} type="close" theme="outlined" />
                    <div className="player-info">

                    </div>
                </Modal>
                <Modal entered={true} visible={false}  wrapClassName={"all-modal game-over win"}
                       closable={false} destroyOnClose={true}>
                    {/*<Icon className="close-modal" onTouchStart={()=>{this.setState({isOpenPlayer:false})}} type="close" theme="outlined" />*/}
                    <div className="player-info">
                        <div className="game-over-header">
                            <Avatar icon="user" src={this.props.userInfo.data.avatar||""}/>
                            <p>
                                {this.props.userInfo.data.username}
                            </p>
                        </div>
                        <div className="game-info">
                            <table>
                                <tbody>
                                <tr className="win-tr">
                                    <td><span>No.1：</span></td>
                                    <td><div>阿狸大大,金币-200,积分+10</div></td>
                                </tr>
                                <tr className="win-tr">
                                    <td><span>No.2：</span></td>
                                    <td><div>阿狸大大,金币-200,积分+10</div></td>
                                </tr>
                                <tr className="win-tr">
                                    <td><span>No.3：</span></td>
                                    <td><div>阿狸大大123123123123,金币-200,积分+10</div></td>
                                </tr>
                                <tr>
                                    <td><span>lose：</span></td>
                                    <td><div>阿狸大大,金币-200,积分+10</div></td>
                                </tr>
                                <tr>
                                    <td><span>lose：</span></td>
                                    <td><div>阿狸大大,金币-200,积分+10</div></td>
                                </tr>
                                <tr>
                                    <td><span>lose：</span></td>
                                    <td><div>阿狸大大,金币-200,积分+10</div></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="button-operation">
                            <Button>炫耀一下</Button>
                            <Button>再来一次</Button>
                        </div>
                        <Icon type="close-circle" theme="outlined" />
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
export default connect(mapStateToProps)(GameHome)