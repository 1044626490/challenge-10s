import React from "react"
import { Tabs, Icon } from 'antd';
import FriendTab from "./component/FriendTab"
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyFriend.less"
import Api from '~/until/api';

const TabPane = Tabs.TabPane;

class MyFriend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultActiveKey:"1",
            friendForm:[],
            count:0
        }
    }

    componentWillMount(){
        let id = this.props.match.params.pageId;
        this.setState({
            defaultActiveKey:id||"1"
        })
    }

    callback(value){
        this.setState({
            defaultActiveKey:value
        })
    }

    componentDidMount(){
        Api.selfFriend().then((res) => {
            this.setState({
                friendForm:res.data,
                count:res.count
            })
        }).catch((err) => {

        })
    }

    render(){
        console.log(this.state.defaultActiveKey)
        const tabs = [
            {
                key:"1",
                name:"我的好友",
            },
            {
                key:"2",
                name:"添加好友"
            },
            {
                key:"3",
                name:"邀请好友"
            }
        ];
        return(
            <div className="my-friend-wrap">
                <HeaderNav name="好友"/>
                <div className="my-friend-container">
                    <Tabs activeKey={this.state.defaultActiveKey} onChange={this.callback.bind(this)}>
                        {
                            tabs.map((item, index) => {
                                console.log(item.key)
                                return <TabPane tab={item.name} key={item.key}>
                                    <FriendTab item={item} key={item.key} index={index}/>
                                        {/*{*/}
                                            {/*this.state.defaultActiveKey === item.key?<Icon type="caret-up" theme="outlined" />:null*/}
                                        {/*}*/}
                                </TabPane>
                            })
                        }
                    </Tabs>
                    {
                        this.state.defaultActiveKey === "1"?<div className="rank-info">
                            <div className="rank-my-info">
                                <p className="info-name">好友数量&nbsp;&nbsp;&nbsp;{this.state.friendForm.length}/300</p>
                                <p>我的排名：<span style={{color:"#decc35"}}>未上榜</span></p>
                            </div>
                        </div>:null
                    }
                </div>
            </div>
        )
    }
}

export default MyFriend