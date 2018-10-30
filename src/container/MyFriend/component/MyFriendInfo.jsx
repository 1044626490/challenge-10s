import React from "react"
import {Avatar, Checkbox, Col, Icon, Row} from "antd";
import "./MyFriendInfo.less"

class MyFriendInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="my-friend-info">
                <div className="my-friend-info-item">
                    <Row type="flex" justify="start" align="top">
                        <Col span={3}><span className="rank-first"></span></Col>
                        <Col span={5}>
                            <Avatar shape="square" icon="user" />
                        </Col>
                        <Col span={15}>
                            <div>
                                <Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>
                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="my-friend-info-item">
                    <Row type="flex" justify="start" align="top">
                        <Col span={3}><span className="rank-second"></span></Col>
                        <Col span={5}>
                            <Avatar shape="square" icon="user" />
                        </Col>
                        <Col span={15}>
                            <div>
                                <Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>
                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="my-friend-info-item">
                    <Row type="flex" justify="start" align="top">
                        <Col span={3}><span className="rank-third"></span></Col>
                        <Col span={5}>
                            <Avatar shape="square" icon="user" />
                        </Col>
                        <Col span={15}>
                            <div>
                                <Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>
                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="my-friend-info-item">
                    <Row type="flex" justify="start" align="top">
                        <Col span={3}><span className="rank">4</span></Col>
                        <Col span={5}>
                            <Avatar shape="square" icon="user" />
                        </Col>
                        <Col span={15}>
                            <div>
                                <Row><Col span={9}><span className="level-card">第21级</span></Col><Col span={15}><span className="add-friend-name">阿狸大大</span></Col></Row>
                                <Row><Col span={24}><Icon type="star" theme="filled" /><span className="ranking">总积分全国前32.11%</span></Col></Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default MyFriendInfo