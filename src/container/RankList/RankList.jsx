import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import "./RankList.less"
import MyFriendInfo from "../MyFriend/component/MyFriendInfo";
import FriednInfoModal from "../MyFriend/component/FriednInfoModal"
import Api from '~/until/api';
import {Tabs} from "antd";

const TabPane = Tabs.TabPane;
class RankList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultActiveKey:"1",
            friendForm:[],
            allForm:[],
            count:0,
            isOpenFriendModal:false,
            myRank:null
        }
    }

    callback(){

    }

    // openFriendModal(isOpen,uid){
    //     if(isOpen){
    //         Api.otherUserInfo({uid}).then((res) => {
    //             console.log(res.data)
    //             this.setState({
    //                 friendInfo:res.data,
    //                 isOpenFriendModal:true,
    //             })
    //         });
    //     }else {
    //         this.setState({
    //             isOpenFriendModal:false,
    //         })
    //     }
    // }

    componentDidMount(){
        this.getRanklist()
    }

    getRanklist(){
        Api.selfFriend().then((res) => {
            this.setState({
                friendForm:res.data,
                count:res.count
            })
        }).catch((res) => {
            console.log(res)
        })
        Api.leaderBoard().then((res) => {
            this.setState({
                allForm:res.data.rank,
                myRank:res.person_rank
            })
        }).catch(err =>{
            console.log(err)
        })
    }


    render(){
        const tabs = [
            {
                key:"1",
                name:"总排行",
            },
            {
                key:"2",
                name:"好友排行"
            }
        ];
        return(
            <div className="rank-list-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="rank-list-container">
                    <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={()=>this.callback()}>
                        {
                            tabs.map((item, index) => {
                                console.log(item.key);
                                return <TabPane tab={item.name} key={item.key}>
                                    <MyFriendInfo friendForm={item.key === "1"?this.state.allForm:this.state.friendForm} count={this.state.count}/>
                                        {
                                            index === 0?<div className="rank-info">
                                                <div className="rank-my-info">
                                                    <p className="info-name">总排行&nbsp;&nbsp;&nbsp;前100名</p>
                                                    <p>我的排名：<span style={{color:"#decc35"}}>未上榜</span></p>
                                                </div>
                                            </div>:<div className="rank-info">
                                                <div className="rank-my-info">
                                                    <p className="info-name">好友数量&nbsp;&nbsp;&nbsp;{this.state.friendForm.length}/300</p>
                                                    <p>我的排名：<span style={{color:"#decc35"}}>未上榜</span></p>
                                                </div>
                                            </div>
                                        }
                                </TabPane>
                            })
                        }
                    </Tabs>
                </div>
                {/*{*/}
                    {/*this.state.isOpenFriendModal?*/}
                        {/*<FriednInfoModal info={this.state.friendInfo} openModal={()=>this.openFriendModal()}*/}
                                         {/*isOpenModel={this.state.isOpenFriendModal}*/}
                                         {/*count={this.props.count}/>:null*/}
                {/*}*/}
            </div>
        )
    }
}

export default RankList