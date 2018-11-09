import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import "./RankList.less"
import MyFriendInfo from "../MyFriend/component/MyFriendInfo";
import FriednInfoModal from "../MyFriend/component/FriednInfoModal"
import Api from '~/until/api';
import {Tabs} from "antd";
import connect from "react-redux/es/connect/connect";

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
            myRank:null,
            myFriendRank:0
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
        let myRank = null
        Api.leaderBoard().then((res) => {
            console.log(res)
            myRank = res.person_rank
            this.setState({
                allForm:res.data.rank,
                myRank:res.data.person_rank,
                count:res.data.count_num,
            })
            console.log(res)
        }).catch(err =>{
            console.log(err)
        });
        Api.selfFriend().then((res) => {
            console.log(res);
            let rank = 0;
            for(let i=0;i<res.data.length-1;i++){
                for(let j=0;j<res.data.length-1-i;j++){
                    if(res.data[j].rownum>res.data[j+1].rownum){
                        let temp=res.data[j];
                        res.data[j]=res.data[j+1];
                        res.data[j+1]=temp;
                    }
                }
            }
            for(let i=0;i<res.data.length;i++){
                if(myRank.uid === res.data[i].uid){
                    rank = i+1
                }
            }
            console.log(res)
            this.setState({
                friendForm:res.data,
                count:res.count,
                myFriendRank:rank
            })
        }).catch((res) => {
            console.log(res)
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
        console.log(this.state.count)
        return(
            <div className="rank-list-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="rank-list-container">
                    <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={()=>this.callback()}>
                        {
                            tabs.map((item, index) => {
                                return <TabPane tab={item.name} key={item.key}>
                                    <MyFriendInfo friendForm={item.key === "1"?this.state.allForm:this.state.friendForm} count={this.state.count}/>
                                        {
                                            index === 0?<div className="rank-info">
                                                <div className="rank-my-info">
                                                    <p className="info-name">总排行&nbsp;&nbsp;&nbsp;前100名</p>
                                                    <p>我的排名：<span style={{color:"#decc35"}}>
                                                        {this.state.myRank&&this.state.myRank[0].rownum <= 100?"第"+this.state.myRank[0].rownum+"名":"未上榜"}
                                                        </span></p>
                                                </div>
                                            </div>:<div className="rank-info">
                                                <div className="rank-my-info">
                                                    <p className="info-name">好友数量&nbsp;&nbsp;&nbsp;{this.state.friendForm.length}/300</p>
                                                    <p>我的排名：<span style={{color:"#decc35"}}>{this.state.myFriendRank?"第"+this.state.myFriendRank+"名":"未上榜"}</span></p>
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

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(RankList)