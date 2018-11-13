import React from "react"
import {Icon, Modal, Avatar, Row, Col, Progress, message} from "antd";
import "./OtherUserInfo.less"
import Api from '~/until/api';

class OtherUserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    addFriend(uid){
        let params = {uid:uid.toString()};
        Api.batchAddUser(params).then((res) => {
            message.info(res.msg)
        }).catch((err) => {
        })
    }

    render(){
        const info = this.props.info;
        const winRate =  info.total_office === 0?0:Math.round((info.victory/info.total_office)*100);
        return(
            <div className="other-userinfo-wrap">
                <Modal entered={true} visible={this.props.isOpenPlayer}  wrapClassName={"all-modal open-player-info"}
                       closable={false} destroyOnClose={true}>
                    <Icon className="close-modal" onClick={()=>this.props.openPlayerInfo(false)} type="close" theme="outlined" />
                    <div className="player-info">
                        <Row>
                            <Col span={8}>
                                <Avatar icon="user" src={info.avatar||""}/>
                                {
                                    info.is_friend?null:<Icon type="plus-circle" onClick={()=>this.addFriend(info.uid)} theme="filled" />
                                }
                            </Col>
                            <Col span={16}>
                                <Row>&nbsp;&nbsp;<span className="info-username">{info.username.slice(0,8)}（{info.uid}）</span></Row>
                                {/*<Row><Col span={6}><span>ID：</span></Col><Col span={18}>&nbsp;{info.uid}</Col></Row>*/}
                                <Row><Col span={6}><span>等级：</span></Col><Col span={18}>&nbsp;lv{info.level}&nbsp;&nbsp;&nbsp;&nbsp;金币：&nbsp;{info.gold}</Col></Row>
                                <Row><Col span={6}><span>胜负：</span></Col><Col span={18}>&nbsp;{info.victory}/{info.total_office}({winRate}%)</Col></Row>
                                {/*<Row>金币：&nbsp;{info.gold}&nbsp;&nbsp;&nbsp;&nbsp;积分：&nbsp;{info.integral}</Row>*/}
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default OtherUserInfo