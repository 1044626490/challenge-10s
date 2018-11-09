import {Avatar, Col, Icon, Modal, Row, Tabs, Progress, Button} from "antd";
import React from "react";
import "./MyTask.less"
import { message } from "antd"
import Api from '~/until/api';
import $ from "jquery"

const TabPane = Tabs.TabPane;
class MyTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageId:"1",
            taskData:{},
            achievementList:{}
        }
    }

    componentWillMount(){
        this.getTaskList()
    }

    getTaskList = () => {
        Api.dailyTaskList().then(res => {
            console.log(res)
            this.setState({
                taskData:res.data
            })
        }).catch(err => {

        })
        Api.achievementList().then(res =>{
            console.log(res)
            this.setState({
                achievementList:res.data
            })
        })
    }

    changetabs(value){
        this.setState({pageId:value})
    }

    receiveAchievementTask(id){
        Api.receiveAchievementTask({id}).then(res => {
            this.getTaskList()
        }).catch(err =>{

        })
    }

    receiveDailyTask(id){
        console.log(123123123)
        Api.receiveDailyTask({id}).then(res => {
            message.success(res.msg)
            this.getTaskList()
        }).catch(err =>{
            message.info(err.msg)
        })
    }

    render(){
        const { taskData,achievementList } = this.state;
        return(
            <div className="my-task-wrap">
                <Modal entered={true} visible={this.props.isOpenMyTask}  wrapClassName={"all-modal my-task-container"}
                       closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onClick={this.props.closeMyTask} type="close" theme="outlined" />
                        <Tabs
                            activeKey={this.state.pageId}
                            onChange={(value)=>this.changetabs(value)}
                            className="task-tabs"
                        >
                            <TabPane tab="每日任务" key="1">
                                <div>
                                    {
                                        taskData.task_list&&taskData.task_list.map((item, index) => {
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                        <Row>
                                                            <Progress successPercent={item.name !== "参加10局游戏"?(taskData.today_win/item.reach*100):(taskData.join_game_num/item.reach*100)}/><span className="progress-value">
                                                        {item.name !== "参加10局游戏"?"("+taskData.today_win+"/"+item.reach+")":"("+taskData.join_game_num+"/"+item.reach+")"}</span>
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className={item.is_recived?"disabled-button":item.name !==
                                                        "参加10局游戏"?taskData.today_win < item.reach?"disabled-button":""
                                                            :taskData.join_game_num < item.reach?"disabled-button":""}
                                                                onClick={()=>this.receiveDailyTask(item.id)}
                                                                disabled={item.is_recived?true:item.name !==
                                                                    "参加10局游戏"?taskData.today_win < item.reach?true:false:taskData.join_game_num < item.reach?true:false}>领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                    <p className="has-got">已领取</p>
                                    {
                                        taskData.today_recived&&taskData.today_recived.map((item, index) => {
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                        <Row>
                                                            <Progress successPercent={100}/><span className="progress-value">
                                                            {item.reach}/{item.reach}</span>
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className="disabled-button" disabled={true}>已领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="成就任务" key="2">
                                <div>
                                    {
                                        achievementList.task_list&&achievementList.task_list.map((item, index) => {
                                            return <div key={index} className="my-task-info-item">
                                                <Row type="flex" justify="start" align="top">
                                                    <Col span={6}>
                                                        <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            {item.name}
                                                        </Row>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Button className={item.is_recived?"disabled-button":""}
                                                                disabled={item.is_recived} onClick={()=>this.receiveAchievementTask(item.id)}>
                                                            领取</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        })
                                    }
                                </div>

                                <p className="has-got">已领取</p>

                                {
                                    achievementList.is_recived&&achievementList.is_recived.map((item, index) => {
                                        return <div key={index} className="my-task-info-item">
                                            <Row type="flex" justify="start" align="top">
                                                <Col span={6}>
                                                    <Avatar shape="square" src={item.img} size="large" icon="user" />
                                                </Col>
                                                <Col span={12}>
                                                    <Row>
                                                        {item.name}
                                                    </Row>
                                                </Col>
                                                <Col span={6}>
                                                    <Button className="disabled-button" disabled={true}>已领取</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }
                            </TabPane>
                        </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MyTask
