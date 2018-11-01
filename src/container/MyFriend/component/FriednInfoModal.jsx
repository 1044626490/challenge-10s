import React from "react"
import {Avatar, Button, Icon, Modal, Progress} from "antd";
import "./FriednInfoModal.less"

class FriednInfoModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const info = this.props.info;
        const winRate = info.total_office !== 0 ?Math.round((info.victory/info.total_office)*100):0;
        return(
            <div className="friend-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="info-body">
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../../layouts/image/head.png")} />
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>
                                    <span>
                                    <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                    </span>
                                </p>
                                <p>
                                    签名：{info?info.uid:0}
                                </p>
                                <p>
                                    胜负：{info?info.victory+"/"+info.total_office+"（"+winRate+"%）":0}
                                    <span className="delete-friend button"></span>
                                    {/*<Button className="open-reset-modal" onClick={()=>{this.setState({isResetMyInfo:true})}}>编辑</Button>*/}
                                </p>
                            </div>
                            {/*<div className="my-account">*/}
                                {/*<span>我的账号：</span><span></span>*/}
                            {/*</div>*/}
                        </div>
                        <div className="my-class-medal">
                            <div className="my-class my-progress">
                                <p>等级:（12/32）</p>
                                <img src={require("../../../layouts/image/star.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                            <div className="my-medal my-progress">
                                <p>勋章数:（12/32）</p>
                                <img src={require("../../../layouts/image/medal1.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                        </div>
                    </div>
                    <Icon onClick={()=>this.props.openModal(false)} type="close-circle" theme="outlined" />
                </Modal>
            </div>
        )
    }
}

export default FriednInfoModal