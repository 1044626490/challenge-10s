import React from "react"
import { Avatar, Row, Col, Checkbox, Icon, Button, message} from "antd"
import "./FriendTab.less"
import MyFriendInfo from "./MyFriendInfo";
import Api from '~/until/api';

class FriendTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addFriendInfo:[],
            isRefresh:false,
            friendForm:[],
            checkBox:[],
            type:1,
            count:0,
        }
    }

    componentDidMount(){
        this.addUserList()
    }

    addUserList = () => {
        Api.addUserList().then((res) => {
            console.log(res);
            this.setState({
                addFriendInfo:res.data,
                type:res.type
            })
        }).catch((err) => {
            console.log(err)
        })
        Api.selfFriend().then((res) => {
            this.setState({
                friendForm:res.data,
                count:res.count
            })
        }).catch((err) => {

        })
    };

    checkBox = (e,item) => {
        console.log(e.target.checked);
        let checkBox = this.state.checkBox;
        if(e.target.checked){
            checkBox.push(item.uid);
        }else {
            let index = checkBox.indexOf(item.uid);
            checkBox.splice(index,1)
        }
        this.setState({
            checkBox
        })
    };

    checkAll = () => {
        let checkBox = [];
        if(this.state.checkBox.length === this.state.addFriendInfo.length){
            this.setState({
                checkBox
            })
        }else {
            for(let i=0;i<this.state.addFriendInfo.length;i++){
                checkBox.push(this.state.addFriendInfo[i].uid)
            }
            this.setState({
                checkBox
            })
        }
    };

    refresh = () => {
        this.setState({isRefresh:true});
        this.addUserList();
        let setI = setTimeout(
            ()=>{
                this.setState({
                    isRefresh:false,
                    checkBox:[]
                });
            clearTimeout(setI)}
            ,300)
    };

    checkAddFriend(isCheckAdd){
        let checkBox = this.state.checkBox.join(",");
        console.log(checkBox)
        if(isCheckAdd){
            Api.batchAgreeApply({uid:checkBox}).then((res) => {
                console.log(res)
                this.addUserList()
            })
        }else {
            Api.batchRefuseApply({uid:checkBox}).then((res) =>{
                console.log(res)
                this.addUserList()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    applyAddUser(){
        let checkBox = this.state.checkBox.join(",");
        Api.batchAddUser({uid:checkBox}).then((res) => {
            message.info(res.msg)
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        console.log(this.state.checkBox.length === this.state.addFriendInfo.length);
        const key = this.props.item.key;
        return(
            <div className="tab-friend-wrap">
                {
                    key === "1"?<div className="my-friend-info-container">
                        <div>
                            <MyFriendInfo isFriendRank={true} friendForm={this.state.friendForm} count={this.state.count}/>
                        </div>
                    </div>:key === "2"?<div className="add-friend-container">
                        {
                            this.state.addFriendInfo[0]&&this.state.addFriendInfo.map((item, index) =>{
                                return <div className="add-friend-item" key={index}>
                                    <Row type="flex" justify="start" align="top">
                                        <Col span={5}>
                                            <Avatar shape="square" src={item.avatar} icon="user" />
                                        </Col>
                                        <Col span={15}>
                                            <div>
                                                <Row><Col span={9}><span className="level-card">第{item.level}级</span></Col><Col span={15}><span className="add-friend-name">{item.username}</span></Col></Row>
                                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>
                                            </div>
                                        </Col>
                                        <Col span={4}><Checkbox key={Math.random()} defaultChecked={this.state.checkBox.indexOf(item.uid) !== -1} onChange={(e)=>this.checkBox(e,item)} value={item.uid}></Checkbox></Col>
                                    </Row>
                                </div>
                            })
                        }
                        <div className="operation-button">
                            {
                                this.state.addFriendInfo[0]&&this.state.type === 1?
                                    <div className="check-all" key={Math.random()}>
                                        <Button onClick={()=>this.checkAddFriend(true)}>确认添加</Button>
                                        <Button style={{backgroundColor:"#a094a3"}} onClick={()=>this.checkAddFriend(false)}>拒绝添加</Button>
                                        <Checkbox defaultChecked={this.state.checkBox.length === this.state.addFriendInfo.length} onChange={()=>this.checkAll()}></Checkbox>
                                    </div>:<div key={Math.random()}>
                                                <Button onClick={()=>this.applyAddUser()}>申请添加</Button>
                                                <span onClick={()=>this.refresh()}
                                                    className={this.state.isRefresh?"refresh refresh-active":"refresh"}>
                                                </span>
                                        <Checkbox defaultChecked={this.state.checkBox.length == this.state.addFriendInfo.length} onChange={()=>this.checkAll()}></Checkbox>
                                    </div>
                            }
                        </div>
                    </div>:<div className="add-friend-container invite-friend-container">
                        <div className="add-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>

                                </Col>
                                <Col span={14}>微信</Col>
                                <Col span={6}>
                                    <Button>邀请好友</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="add-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>

                                </Col>
                                <Col span={14}>QQ</Col>
                                <Col span={6}>
                                    <Button>邀请好友</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="add-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>

                                </Col>
                                <Col span={14}>二维码</Col>
                                <Col span={6}>
                                    <Button>邀请好友</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default FriendTab