import React from "react"
import { Avatar, Row, Col, Checkbox, Icon, Button, message} from "antd"
import "./FriendTab.less"
import MyFriendInfo from "./MyFriendInfo";
import Api from '~/until/api';
import $ from "jquery"
import { jsSdkConfig } from "../../../constants/Share.js"

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
            let arr = res.data;
            console.log(res);
            for(let j=0;j<arr.length-1;j++){
                //两两比较，如果前一个比后一个大，则交换位置。
                for(let i=0;i<arr.length-1-j;i++){
                    if(arr[i].rownum>arr[i+1].rownum){
                        let temp = arr[i];
                        arr[i] = arr[i+1];
                        arr[i+1] = temp;
                    }
                }
            }
            this.setState({
                addFriendInfo:arr,
                type:res.type,
                count:res.count
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
        $(".refresh").toggleClass("refresh-active");
        this.addUserList();
        let setI = setTimeout(
            ()=>{
                this.setState({
                    checkBox:[]
                });
                $(".refresh").toggleClass("refresh-active");
                clearTimeout(setI)}
            ,100)
    };
    checkAddFriend(isCheckAdd){
        let checkBox = this.state.checkBox.join(",");
        console.log(checkBox)
        if(isCheckAdd){
            Api.batchAgreeApply({uid:checkBox}).then((res) => {
                message.success(res.msg)
                this.addUserList()
            })
        }else {
            Api.batchRefuseApply({uid:checkBox}).then((res) =>{
                this.addUserList()
            }).catch((err) => {
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
                                return <div className={this.state.checkBox.indexOf(item.uid) === -1?"add-friend-item no-checked":"add-friend-item"} key={index}>
                                    <Row type="flex" justify="start" align="top">
                                        <Col span={5}>
                                            <Avatar shape="square" src={item.avatar} icon="user" />
                                        </Col>
                                        <Col span={15}>
                                            <div>
                                                <Row><Col span={6}><span className="level-card">第{item.level}级</span></Col><Col span={18}><span className="add-friend-name">{item.username}</span></Col></Row>
                                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前{(item.rownum/this.state.count*100).toFixed(2)}%</span></Col></Row>
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
                                                    className="refresh">
                                                </span>
                                        <Checkbox defaultChecked={this.state.checkBox.length == this.state.addFriendInfo.length} onChange={()=>this.checkAll()}></Checkbox>
                                    </div>
                            }
                        </div>
                    </div>:<div className="add-friend-container invite-friend-container">
                        <div className="invite-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>
                                    <Avatar src={require("../../../layouts/image/invite/weixin.png")} />
                                </Col>
                                <Col span={14}>微信</Col>
                                <Col span={6}>
                                    <Button onClick={()=>jsSdkConfig(window.location.host)}>邀请好友</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="invite-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>
                                    <Avatar src={require("../../../layouts/image/invite/qq.png")} />
                                </Col>
                                <Col span={14}>QQ</Col>
                                <Col span={6}>
                                    <Button>邀请好友</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="invite-friend-item">
                            <Row type="flex" justify="start" align="top">
                                <Col span={4}>
                                    <Avatar src={require("../../../layouts/image/invite/erweima.png")} />
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