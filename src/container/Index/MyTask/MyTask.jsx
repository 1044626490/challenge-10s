import {Avatar, Col, Icon, Modal, Row, Tabs, Progress, Button} from "antd";
import React from "react";
import "./MyTask.less"

const TabPane = Tabs.TabPane;
class MyTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:"1"
        }
    }

    render(){
        const data1 = [
            {
                name:"游戏中获胜3次",
                progress:"100",
                value:"3/3",
                isDisabled:false
                // src:require("../../../layouts/image")
            },
            {
                name:"游戏中获胜4次",
                progress:"75",
                value:"3/4",
                isDisabled:true
                // src:require("../../../layouts/image")
            },
            {
                name:"游戏中获胜5次",
                progress:"60",
                value:"3/5",
                isDisabled:true
                // src:require("../../../layouts/image")
            }
        ]
        return(
            <div className="my-task-wrap">
                <Modal entered={true} visible={this.props.isOpenMyTask}  wrapClassName={"all-modal my-task-container"}
                       closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onClick={this.props.closeMyTask} type="close" theme="outlined" />
                        <Tabs
                            activeKey={this.state.pageId}
                            tabPosition="top"
                            onChange={(value)=>{this.setState({pageId:value})}}
                            animated={true}
                        >
                            <TabPane tab="每日任务" key="1">
                                {
                                    data1.map((item, index) => {
                                        return <div key={index} className="my-task-info-item">
                                            <Row type="flex" justify="start" align="top">
                                                <Col span={6}>
                                                    <Avatar shape="square" size="large" icon="user" />
                                                </Col>
                                                <Col span={12}>
                                                    <Row>
                                                        {item.name}
                                                    </Row>
                                                    <Row>
                                                        <Progress successPercent={item.progress}/><span className="progress-value">{item.value}</span>
                                                    </Row>
                                                </Col>
                                                <Col span={6}>
                                                    <Button className={item.isDisabled?"disabled-button":""} disabled={item.isDisabled}>领取</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }
                                <p className="has-got">已领取</p>
                                {
                                    data1.map((item, index) => {
                                        return item.isDisabled?null:<div key={index} className="my-task-info-item">
                                            <Row type="flex" justify="start" align="top">
                                                <Col span={6}>
                                                    <Avatar shape="square" size="large" icon="user" />
                                                </Col>
                                                <Col span={12}>
                                                    <Row>
                                                        {item.name}
                                                    </Row>
                                                    <Row>
                                                        <Progress successPercent={item.progress}/><span className="progress-value">{item.value}</span>
                                                    </Row>
                                                </Col>
                                                <Col span={6}>
                                                    <Button className={item.isDisabled?"disabled-button":""} disabled={item.isDisabled}>领取</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }
                            </TabPane>
                            <TabPane tab="成就任务" key="2">
                            </TabPane>
                        </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MyTask
