import React from "react"
import { Avatar, Row, Col, Checkbox, Icon, Button} from "antd"
import "./FriendTab.less"
import MyFriendInfo from "./MyFriendInfo";
import Api from '~/until/api';

class FriendTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addFriendInfo:[],
            isRefresh:false,
            checkBox:[],
            type:1
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

    render(){
        console.log(this.props.item,this.state.checkBox);
        const key = this.props.item.key;
        return(
            <div className="tab-friend-wrap">
                {
                    key === "1"?<div className="my-friend-info-container">
                        <div>
                            <MyFriendInfo />
                        </div>
                    </div>:key === "2"?<div className="add-friend-container">
                        {
                            this.state.addFriendInfo[0]&&this.state.addFriendInfo.map((item, index) =>{
                                console.log(this.state.checkBox.indexOf(item.uid) !== -1)
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
                            <Button>申请添加</Button>
                            <span onTouchStart={()=>this.refresh()}
                                  className={this.state.isRefresh?"refresh refresh-active":"refresh"}>
                            </span>
                            {
                                this.state.addFriendInfo[0]?
                                    <div className="check-all" key={Math.random()}>
                                        <Checkbox defaultChecked={this.state.checkBox.length === this.state.addFriendInfo.length} onChange={()=>this.checkAll()}></Checkbox>
                                    </div>:null
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