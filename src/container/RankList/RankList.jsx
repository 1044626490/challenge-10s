import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import "./RankList.less"
import MyFriendInfo from "../MyFriend/component/MyFriendInfo";
import {Tabs} from "antd";

const TabPane = Tabs.TabPane;
class RankList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultActiveKey:"1"
        }
    }

    callback(){

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
                                console.log(item.key)
                                return <TabPane tab={item.name} key={item.key}>
                                    <MyFriendInfo />
                                        {
                                            index === 0?<div className="rank-info">
                                                123123123
                                            </div>:<div>
                                                156156165
                                            </div>
                                        }
                                </TabPane>
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default RankList