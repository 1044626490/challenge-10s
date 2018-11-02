import React from "react"
import Api from '~/until/api';
import HeaderNav from "../../components/headerNav/headerNav";
import "./MyMedal.less"
import {Tabs, Radio, Carousel, Modal, Icon} from 'antd';

const TabPane = Tabs.TabPane;

class MyMedal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:this.props.match.params.id||"1",
            isOpenMedal:false,
            item:{}
        }
    }

    componentDidMount(){
        Api.getUserMedal().then((res) => {
            console.log(res)
        }).catch((err => {
            console.log(err)
        }))
    }

    openMedal(item){
        this.setState({
            isOpenMedal:true,
            item
        })
    }

    render(){
        const data = [
            {
                name:"大获全胜0",
                level:"33级",
                src:require("../../layouts/image/medal/level1.png")
            },
            {
                name:"大获全胜10",
                level:"33级",
                src:require("../../layouts/image/medal/level2.png")
            },
            {
                name:"大获全胜20",
                level:"33级",
                src:require("../../layouts/image/medal/level3.png")
            },
            {
                name:"大获全胜30",
                level:"33级",
                src:require("../../layouts/image/medal/level4.png")
            },
            {
                name:"大获全胜0",
                level:"33级",
                src:require("../../layouts/image/medal/level1.png")
            },
            {
                name:"大获全胜10",
                level:"33级",
                src:require("../../layouts/image/medal/level2.png")
            },
            {
                name:"大获全胜20",
                level:"33级",
                src:require("../../layouts/image/medal/level3.png")
            },
            {
                name:"大获全胜30",
                level:"33级",
                src:require("../../layouts/image/medal/level4.png")
            },
            {
                name:"大获全胜0",
                level:"33级",
                src:require("../../layouts/image/medal/level1.png")
            }
        ];
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
                                        {
                                            data.map((item ,index) => {
                                                return <li key={index}>
                                                            <img onClick={()=>this.openMedal(item)}
                                                                 src={item.src} alt=""/>
                                                            <i>{item.level}</i>
                                                            <span>{item.name}</span>
                                                        </li>
                                            })
                                        }
                                    </ul>
                                        <ul>
                                            {
                                                data.map((item ,index) => {
                                                    return <li key={index}>
                                                        <img onClick={()=>this.openMedal(item)}
                                                             src={item.src} alt=""/>
                                                        <i>{item.level}</i>
                                                        <span>{item.name}</span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <ul>
                                            {
                                                data.map((item ,index) => {
                                                    return <li key={index}>
                                                        <img onClick={()=>this.openMedal(item)}
                                                             src={item.src} alt=""/>.
                                                        <i>{item.level}</i>
                                                        <span>{item.name}</span>
                                                    </li>
                                                })
                                            }
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
                        {
                            this.state.isOpenMedal?<Modal entered={true} visible={this.state.isOpenMedal}  wrapClassName={"all-modal my-medal-modal"}
                                                          closable={false} destroyOnClose={true}>
                                <div className="bg-light">

                                </div>
                                <Icon className="close-modal" onClick={()=>{this.setState({isOpenMedal:false})}}
                                      type="close" theme="outlined" />
                                <div className="player-info">
                                    <div className="medal-info-content">
                                        <img src={this.state.item.src} alt=""/>
                                        <span className="level">{this.state.item.level}</span>
                                        <p className="medal-name">{this.state.item.name} <span>Ⅲ</span></p>
                                        <p>消费达到100w金币</p>
                                    </div>
                                    <div className="my-medal-operation">
                                        <p>金币+1000</p>
                                        <button onClick={null}>领取奖励</button>
                                        <p>2018-10-17 获得</p>
                                    </div>
                                </div>
                            </Modal>:null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyMedal