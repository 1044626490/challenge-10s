import React from "react"
import Api from '~/until/api';
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyMedal.less"
import { Tabs, Radio, Carousel } from 'antd';

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
                        <div className="header-img">
                            <img src={require("../../layouts/image/medal_head.png")} alt=""/>
                        </div>
                        <Tabs
                            activeKey={this.state.pageId}
                            tabPosition="left"
                            onChange={(value)=>{this.setState({pageId:value})}}
                            animated={true}
                        >
                            <TabPane tab="等级" key="1">
                                <div className="level">
                                    <Carousel afterChange={null}>
                                    <ul>
                                        <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                        <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                        <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                        <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                        <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                        <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                        <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                        <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                        <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                    </ul>
                                        <ul>
                                            <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                            <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                            <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                            <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                            <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                            <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                        </ul>
                                        <ul>
                                            <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                            <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                            <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                            <li><img src={require("../../layouts/image/medal/level1.png")} alt=""/><i>33级</i><span>大获全胜0</span></li>
                                            <li><img src={require("../../layouts/image/medal/level2.png")} alt=""/><i>33级</i><span>大获全胜10</span></li>
                                            <li><img src={require("../../layouts/image/medal/level3.png")} alt=""/><i>33级</i><span>大获全胜20</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                            <li><img src={require("../../layouts/image/medal/level4.png")} alt=""/><i>33级</i><span>大获全胜30</span></li>
                                        </ul>
                                    </Carousel>
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