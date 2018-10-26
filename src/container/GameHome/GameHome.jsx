import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Modal, Avatar, Button, Drawer, Icon } from "antd"
import connect from "react-redux/es/connect/connect";
import "./GameHome.less"

// let userInfo = []
let backTime = 3;
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
            isStartTime:false
        }
    }

    componentDidMount(){
        let homeId = this.props.match.params.homeId;
        this.getWebSocket(homeId);
        this.setState({
            homeId
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
        let setI2 = setInterval(()=>{
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
                            <div>
                                <Button onTouchStart={()=>this.startGame()}>开始游戏</Button>
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
                                    require("../../layouts/image/timego/"+this.state.millisecond[1]+".png")}
                                          alt=""/>
                                </div>
                                <div>
                                    <img src={require("../../layouts/image/timego/"+this.state.millisecond.slice(this.state.millisecond.length-1,this.state.millisecond.length)+".png")}
                                         alt=""/>
                                </div>
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
                    placement="bottom"
                >
                    <Icon type="double-right" theme="outlined" />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(GameHome)