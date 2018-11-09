import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Modal, Avatar, Button, Drawer, Icon, Popconfirm, message } from "antd"
import connect from "react-redux/es/connect/connect";
import OtherUserInfo from "./component/OtherUserInfo"
import $ from "jquery";
import InviteFriend from "./component/InviteFriend"
import Api from '~/until/api';
import "./GameHome.less"
import ReactAudioPlayer from 'react-audio-player';

let setI2;
let homeId = null;
class GameHome extends React.Component{
    constructor(props) {
        super(props);
        this.ws = new WebSocket("ws://api.times168.net:8282");
        this.setI = null;
        this.setI1 = null;
        this.state = {
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data,
            homeId:null,
            userData:[],
            watchUserData:[],
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
            isOpenMask:false,
            otherPlayer:[],
            room_order:null,
            gameResult:[],
            userResult:[],
            isGameOver:false,
            NOme:0,
            areYouReady:[],
            amIReady:false,
            isAllReady:false,
            isInviteFriend:false,
            userType:"1",
            homeownerId:0
        }
    }

    componentDidMount(){
        let homeId = this.props.match.params.homeId;
        let userType = this.props.match.params.status;
        let level = homeId === "1"?"初级":homeId === "2"?"中级":"高级";
        this.setState({
            homeId,
            level,
            userType
        })
        this.getWebSocket(homeId);
    }

    //点击开始游戏按钮
    gameStart(){
        this.setState({
            isOpenMask:false
        })
    }

    //连接websocket
    getWebSocket = (homeId) => {
        let level = homeId.slice(0,1);
        let level1 = level === "S"?1:level === "M"?2:3;
        let NewHome = "#/Dashboard/NewHome/"+(level1-1);
        this.ws.onopen = ()=>{
            let data = JSON.stringify({"type":"join_room","uid":this.props.userInfo.data.uid,"room_id":homeId,"level_room":level1,'user_type':Number(this.props.match.params.status)});
            this.ws.send(data)
        };
        this.ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data;
            let type = data.type || "";
            console.log(userData)
            switch (type) {
                case "ping":
                    break;
                case 'active':
                    if(userData){
                        if(userData.length){
                            let id = this.state.userInfo.uid;
                            for(let i=0;i<userData.length;i++){
                                if(id === userData[i].uid){
                                    this.setState({
                                        isHomeowner:userData[i].is_homeowner,
                                        userType:userData[i].user_type.toString()
                                    })
                                }
                                if(userData[i].is_homeowner){
                                    this.setState({
                                        homeownerId:userData[i].uid
                                    })
                                }
                            }
                            let arr1 = [];
                            let arr2 = [];
                            for(let i =0;i<userData.length;i++){
                                if(userData[i].user_type.toString() === "1"){
                                    arr1.push(userData[i])
                                }else {
                                    arr2.push(userData[i])
                                }
                            }
                            let length = arr1.length;
                            for(let i = length;i < 6;i++){
                                arr1.push({})
                            }
                            this.setState({
                                userData:arr1,
                                watchUserData:arr2,
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
                    break;
                case 'join_room':
                    break;
                case 'leave':
                    if(userData){
                        if(userData.length){
                            let id = this.state.userInfo.uid;
                            for(let i=0;i<userData.length;i++){
                                if(id === userData[i].uid){
                                    this.setState({
                                        isHomeowner:userData[i].is_homeowner,
                                        userType:userData[i].user_type.toString()
                                    })
                                }
                            }
                            let arr1 = [];
                            let arr2 = [];
                            for(let i =0;i<userData.length;i++){
                                if(userData[i].user_type.toString() === "1"){
                                    arr1.push(userData[i])
                                }else {
                                    arr2.push(userData[i])
                                }
                            }
                            let length = arr1.length;
                            for(let i = length;i < 6;i++){
                                arr1.push({})
                            }
                            this.setState({
                                userData:arr1,
                                watchUserData:arr2,
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
                    break;
                case 'ready':
                    let amIReady;
                    let count = 0;
                    for(let i=0;i< userData.length;i++){
                        if(!userData[i].is_ready&&userData[i].uid !== this.state.homeownerId){
                            count++
                        }
                        if(userData[i].uid === this.state.userInfo.uid){
                            amIReady = userData[i].is_ready
                        }
                    }
                    this.setState({
                        areYouReady:userData,
                        amIReady,
                        isAllReady:!count&&userData.length > 1
                    })
                    break;
                case 'rank_result':
                    let NOme = this.state.NOme;
                    for(let j=0;j<userData.length-1;j++){
                        //两两比较，如果前一个比后一个大，则交换位置。
                        for(let i=0;i<userData.length-1-j;i++){
                            if(Math.abs(userData[i].result/1-1000) > Math.abs(userData[i+1].result/1-1000)){
                                let temp = userData[i];
                                userData[i] = userData[i+1];
                                userData[i+1] = temp;
                            }
                        }
                    }
                    for(let i=0;i<userData.length;i++){
                        if(this.state.userInfo.uid === userData[i].uid){
                            NOme = userData[i].is_win;
                        }
                    }
                    let count1 = 0;
                    if(this.state.userType === "1"){
                        this.setI1 = setInterval(()=>{
                            count1++;
                            if(count1 === 30){
                                window.location.href = NewHome;
                                clearInterval(this.setI1);
                            }
                        },1000)
                    };
                    this.setState({
                        gameResult:userData,
                        isGameOver:true,
                        NOme
                    });
                    break;
                case 'begin_game':
                    let setI = setTimeout(()=>{
                        this.setState({
                            isReadyGame:true,
                            isStartGame:true,
                            isOpenMask:false,
                            backTime:3,
                            room_order:data.room_order
                        });
                        clearTimeout(setI)
                    },100);
                    break;
                case 'user_result':
                    this.setState({
                        userResult:userData
                    });
                    break;
                default:
                    break;
            }
        }
    };

    //断开websocket
    componentWillUnmount(){
        clearInterval(this.setI);
        clearInterval(this.setI1);
        this.ws.close()
    }

    //游戏开始
    startGame = () => {
        let userData = [];
        for(let i=0;i<6;i++){
            if(this.state.userData[i].uid){
                userData.push(this.state.userData[i].uid)
            }
        }
        let params = {
            uid:userData.join(","),
            room_id:this.state.homeId
        };
        Api.beginGame(params).then((res) =>{

        }).catch(err => {
        });
    };

    //3秒倒计时
    backTime = () =>{
        let backTime = 3;
        this.setI = setTimeout(()=>{
            $('.bg-cilcle').animate({
                transform:"rotate(360deg)"
            })
        },2000);
        let setI2 = setInterval(()=>{
            this.setState({
                backTime:--backTime
            });
            if(this.state.backTime <= 0 ){
                clearInterval(setI2)
            }
        },1000);
    };

    //20秒计时
    timeGoOn = () =>{
        let millisecond = Number(this.state.millisecond);
        let tenSeconds = Number(this.state.tenSeconds);
        this.setState({
            isStartTime:true
        });
        setI2 = setInterval(()=>{
            millisecond++;
            if(millisecond === 100){
                millisecond = 0
            }
            if(millisecond === 0){
                tenSeconds++
            }
            this.setState({
                millisecond:millisecond.toString(),
                tenSeconds:tenSeconds.toString()
            });
            if(tenSeconds === 20){
                this.gameOver();
                clearInterval(setI2)
            }
        },10)
    };

    //打开其他玩家信息
    openPlayerInfo = (isOpen,uid) => {
        if(isOpen){
            Api.otherUserInfo({uid}).then((res) => {
                this.setState({
                    otherPlayer:res.data,
                    isOpenPlayer:isOpen
                })
            });
        }else {
            this.setState({
                otherPlayer:[],
                isOpenPlayer:isOpen
            })
        }
    };

    //游戏结束回到房间
    returnHome = () =>{
        clearInterval(this.setI);
        let homeId = this.props.match.params.homeId;
        let level = homeId === "1"?"初级":homeId === "2"?"中级":"高级";
        clearInterval(this.setI1);
        this.setState({
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data,
            homeId:homeId,
            isStartGame:false,
            isReadyGame:false,
            backTime:3,
            tenSeconds:"0",
            millisecond:"0",
            isStartTime:false,
            isOpenPlayer:false,
            playerInfo:[],
            level:level,
            isOpenMask:false,
            otherPlayer:[],
            room_order:null,
            gameResult:[],
            userResult:[],
            isGameOver:false,
            NOme:0,
            areYouReady:[],
            amIReady:false,
            isAllReady:false
        });
        // window.location.reload()
        // this.areYouReady()
    };

    //游戏结束
    gameOver(){
        clearInterval(setI2);
        let resultTen = this.state.tenSeconds;
        let resultMil = this.state.millisecond;
        if(resultMil.length < 2){
            resultMil = "0"+resultMil
        }
        let result = resultTen.concat(resultMil);
        let params = {
            result,
            room_id:this.state.homeId,
            uid:this.state.userInfo.uid,
            room_order:this.state.room_order
        };
        Api.gameOver(params).then(res => {
        }).catch(err => {
        })
    }

    //准备
    areYouReady = () => {
        Api.areYouReady({uid:this.state.userInfo.uid,room_id:this.state.homeId}).then(res => {

        }).catch(err => {

        })
    };

    inviteFriend = (isOpen) =>{
        this.setState({
            isInviteFriend:isOpen
        })
    };

    inviteStranger(){
        console.log(123123)
        Api.stranger({room_id:this.state.homeId}).then(res => {
            message.success(res.msg)
        }).catch(err =>{})
    }

    render(){
        if(!this.state.isStartTime&&this.state.isStartGame&&this.state.backTime <= 0&&this.state.millisecond === "0"&&this.state.tenSeconds === "0"){
            this.timeGoOn()
        }
        const uid = this.state.userInfo.uid;
        return(
            <div className="game-home-wrap">
                <HeaderNav name={"["+this.state.homeId+"]"}/>
                {/*<ReactAudioPlayer*/}
                    {/*src={require("../../layouts/video/bg1.mp3")}*/}
                    {/*autoPlay*/}
                    {/*style={{width: 0}}*/}
                {/*/>*/}
                {/*<video className="game-audio"  src={require("../../layouts/video/bg1.mp3")} */}
                       {/*autoPlay={true} loop={true} style={{width: 0}}></video>*/}
                <audio className="game-audio"  src={require("../../layouts/video/bg1.mp3")}
                       autoPlay={true} loop={true} style={{width: 0}}></audio>
                {
                    this.state.isStartGame?<div className="bg-cilcle"></div>:null
                }
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
                                {
                                    this.state.userData.length&&this.state.userData[5].uid?null:
                                        this.state.userType === "1"&&this.state.isHomeowner?
                                        <Button onClick={()=>this.inviteStranger()} className="start-game-yes">随机邀请</Button>:null
                                }
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
                                                return <li key={index} className={item.is_homeowner === 1?"home":""}>
                                                    {
                                                        this.state.areYouReady.map((item1, index1)=>{
                                                            return item.is_homeowner !== 1&&item.uid === item1.uid&&item1.is_ready === 1?<span key={index1} className="are-you-ready"><Icon type="check-circle" theme="outlined" /></span>:null
                                                        })
                                                    }
                                                    <Avatar onClick={!item.uid?()=>this.inviteFriend(true):()=>this.openPlayerInfo(true,item.uid)} icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                    {item.is_homeowner === 1?<span className="is-homeowner">房主</span>:null}
                                                    <p>{item.username}</p>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    <div className="start-game-pop">
                                        {
                                            this.state.userType === "0"?null:this.state.isHomeowner?
                                                <Popconfirm overlayClassName={"start-game-pop"}
                                                            placement="top" title={"确认开始"}
                                                            onCancel={()=>this.startGame()}
                                                            onVisibleChange={()=>this.gameStart()}
                                                            onConfirm={()=>this.gameStart()}
                                                            okText="取消"
                                                            cancelText="确认">
                                                    <Button className={this.state.userData.length&&!
                                                        this.state.userData[1].uid?"start-game-no":this.state.isAllReady?"start-game-yes":"start-game-no"}
                                                            disabled={this.state.userData.length&&!
                                                                this.state.userData[1].uid||!this.state.isAllReady}>开始游戏</Button>
                                                </Popconfirm>:
                                                <Button key={Math.random()} onClick={()=>this.areYouReady()} className="start-game-yes">
                                                    {this.state.amIReady?"取消准备":"准备"}
                                                </Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :<div>
                            <div className="game-start-menber-content">
                                <div className="time-goeson">
                                <span className="point">
                                    {this.state.tenSeconds < 10?
                                        "0"+this.state.tenSeconds:this.state.tenSeconds}
                                    <span>
                                            :
                                        </span>
                                    &nbsp;
                                    {this.state.millisecond < 10?
                                        "0"+this.state.millisecond:this.state.millisecond}
                                </span>
                                    {
                                        this.state.userType === "1"?<p className="stop-game">
                                            {this.state.tenSeconds >= 5?<Button onClick={()=>this.gameOver()}>停止</Button>:null}
                                        </p>:null
                                    }
                                </div>
                                {
                                    this.state.isStartGame&&this.state.backTime === 3?this.backTime():null
                                }
                                {
                                    this.state.isStartGame&&this.state.backTime > 0?<div className="game-back-time">
                                        <img className={"game-back-time"+this.state.backTime} src={require("../../layouts/image/back"+
                                            this.state.backTime+".png")} alt=""/>
                                    </div>:null
                                }
                                <ul className={this.state.isStartGame?"game-start":null}>
                                    {
                                        this.state.userData&&this.state.userData.map((item ,index) => {
                                            // if(item.is_homeowner === 1){
                                            return <li key={index} className={item.is_homeowner === 1?"home":""}>
                                                {
                                                    this.state.userResult.map((item1, index1)=>{
                                                        return Number(item1.uid) === item.uid?
                                                            <i className="user-mask">
                                                                {item1.result.slice(0,-2)}:{item1.result.slice(-2,item1.result.length)}
                                                            </i>:null
                                                    })
                                                }
                                                <Avatar onClick={item.uid?()=>this.openPlayerInfo(true,item.uid):null}
                                                        icon="user" src={item.avatar||require("../../layouts/image/sc.png")} alt=""/>
                                                {
                                                    item.is_homeowner === 1?<span className="is-homeowner game-start-homeoener">房主</span>:null
                                                }
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                }
                {/*<Drawer*/}
                {/*title=""*/}
                {/*maskClosable={false}*/}
                {/*closable={false}*/}
                {/*onClose={this.onClose}*/}
                {/*visible={false}*/}
                {/*className="bottom-pour"*/}
                {/*placement="bottom"*/}
                {/*>*/}
                {/*<p className="up">*/}
                {/*<span></span>*/}
                {/*</p>*/}
                {/*<p className="home-name"><span>{this.state.level}房间</span></p>*/}
                {/*<p className="into-home-price"><img className="into-home-price-icon" src={require("../../layouts/image/homePage_icon.png")}/><span>入场费：</span><span>100金币</span></p>*/}
                {/*<div className="button-operation">*/}
                {/*<Button>进入房间</Button>*/}
                {/*<Button>前往押注</Button>*/}
                {/*</div>*/}
                {/*</Drawer>*/}
                {
                    this.state.isOpenPlayer?<OtherUserInfo info={this.state.otherPlayer}
                                                           isOpenPlayer={this.state.isOpenPlayer}
                                                           openPlayerInfo={this.openPlayerInfo.bind(this)}
                    />:null
                }
                {
                    this.state.isInviteFriend?<InviteFriend homeId={this.state.homeId} isInviteFriend={this.state.isInviteFriend} inviteFriend={()=>this.inviteFriend()}/>:null
                }
                <Modal entered={true} visible={this.state.isGameOver}
                       wrapClassName={"all-modal game-over"}
                       closable={false} destroyOnClose={true}>
                    {
                        this.state.userType === "0"?null:this.state.NOme === 1?<div className="twinkle-little-star win">
                            <div className="star1"><span>
                                </span></div>
                            <div className="star2"><span>
                                </span></div>
                            <div className="star3"><span>
                                </span></div>
                            <div className="star4"><span>
                                </span></div>
                            <div className="win-pc">
                            </div>
                        </div>:<div className="lose"></div>
                    }
                    <Icon className="close-modal" onClick={()=>{this.setState({isGameOver:false})}} type="close" theme="outlined" />
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
                                {this.state.gameResult.map((item ,index) =>{
                                    return <tr className={item.is_win?"win-tr":""}>
                                        <td><span>No.{index+1}：</span></td>
                                        <td><div>{item.username},{item.result.slice(0,-2)}.{item.result.slice(-2,item.result.length)}s,金币+{item.win_gold},积分+{item.this_integral}</div></td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                        {
                            this.state.userType === "1"?<div className="button-operation">
                                <Button onClick={()=>{window.location.href = "#/Dashboard/index"}}>退出房间</Button>
                                <Button onClick={()=>this.returnHome()}>再来一次</Button>
                            </div>:<div className="button-operation">
                                <Button  onClick={()=>this.returnHome()}>继续观战</Button>
                                <Button onClick={()=>{window.location.href = "#/Dashboard/index"}}>退出房间</Button>
                            </div>
                        }
                    </div>
                </Modal>
                <div className="watch-game-menber">
                    {
                        this.state.watchUserData.length?<ul>
                                {
                                    this.state.watchUserData.map((item, index) => {
                                        return<li key={index}>
                                            <Avatar size="small" icon="user" src={item.avatar}/>
                                        </li>
                                    })
                                }
                        </ul>:<p>暂无人观战...</p>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(GameHome)