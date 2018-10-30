import React from "react"
import { Tabs, Icon } from 'antd';
import FriendTab from "./component/FriendTab"
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyFriend.less"

const TabPane = Tabs.TabPane;

class MyFriend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultActiveKey:"1"
        }
    }

    componentWillMount(){
        let id = this.props.match.params.pageId;
        this.setState({
            defaultActiveKey:id||"1"
        })
    }

    callback(value){
        // console.log(value)
    }

    componentDidMount(){
        // this.getMyFriend(){
        //
        // }
    }

    render(){
        console.log(this.props.match,this.props.match.params.pageId,this.state.defaultActiveKey)
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
                    <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={()=>this.callback()}>
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
                </div>
            </div>
        )
    }
}

export default MyFriend