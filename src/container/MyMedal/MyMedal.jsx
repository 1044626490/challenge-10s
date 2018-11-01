import React from "react"
import Api from '~/until/api';
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyMedal.less"
import { Tabs, Radio } from 'antd';

const TabPane = Tabs.TabPane;

class MyMedal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:this.props.match.params.id||"1"
        }
    }

    componentDidMount(){
        Api.getUserMedal().then((res) => {
            console.log(res)
        }).catch((err => {
            console.log(err)
        }))
    }

    render(){
        console.log(this.state.pageId,this.state.pageId === "2");
        return(
            <div className="my-medal-wrap">
                <HeaderNav name="挑战10秒"/>
                <div className="my-medal-container">
                    <div className="my-medal-content">
                        <Tabs
                            activeKey={this.state.pageId}
                            tabPosition="left"
                            onChange={(value)=>{this.setState({pageId:value})}}
                            animated={true}
                        >
                            <TabPane tab="等级" key="1">
                                <div className="level">
                                    123123
                                </div>
                            </TabPane>
                            <TabPane tab="任务" key="2">
                                <div className="task">
                                    sadasdasd
                                </div>
                            </TabPane>
                            <TabPane tab="隐藏" key="3">
                                <div className="conceal">
                                    2s2s2s2s22s
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyMedal