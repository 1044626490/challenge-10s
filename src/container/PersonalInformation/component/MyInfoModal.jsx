import React from "react"
import {Avatar, Button, Icon, Input, message, Modal, Progress, Upload} from "antd";
import "./MyInfoModal.less"
import Api from '~/until/api';

class MyInfoModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isResetMyInfo:false,
            myName: this.props.info.username,
            header:this.props.info.avatar,
            signature:this.props.info.signature,
            victoryRate:0
        }
    }

    componentDidMount(){
        let rate = 0;
        if(this.props.info.total_office !== 0){
            rate = Math.round(this.props.info.victory/this.props.info.total_office);
        }
        this.setState({
            header:this.props.info.avatar,
            signature:this.props.info.signature,
            myName: this.props.info.username,
            victoryRate:rate
        })
    }

    resetMyInfo = (e,name) => {
        console.log(e.target.value,name)
        this.setState({
            [name]:e.target.value
        })
    };

    saveInfo(){
        let params = {
            username:this.state.myName,
            signature:this.state.signature,
            avatar:this.state.header
        }
        console.log(params)
        Api.updateUserinfo(params).then((res) => {
            message.success(res.msg)
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    changeHeader(file){
        console.log(file.file)
        Api.uploadMyHead({file:file.file}).then((res) => {
            message.success(res.msg)
            this.setState({
                header:res.src
            })
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    getUserInfo(){
        this.props.getUserInfo();
        this.setState({
            isResetMyInfo:false
        })
    }

    render(){
        const info = this.props.info;
        return(
            <div className="my-info-modal-wrap">
                <Modal entered={true} visible={this.props.isOpenModel} wrapClassName={"my-info-modal"}
                       closable={false} destroyOnClose={true}
                >
                    <div className="info-body">
                        <div className="header-wrap">
                            <Avatar size={64} shape="square" icon="user" src={info?info.avatar:require("../../../layouts/image/head.png")} />
                            <div className="my-info">
                                <p className="name-class"><span>昵称：</span>
                                    {/*{*/}
                                    {/*this.state.isResetName? */}
                                    {/*<span>*/}
                                    {/*<Input placeholder="修改昵称" onChange={(e)=>{this.setState({myName:e.target.value})}}/>*/}
                                    {/*<Icon type="check" theme="outlined"  onTouchStart={()=>{this.resetName()}}/>*/}
                                    {/*<Icon type="close" theme="outlined"  onTouchStart={()=>{this.setState({isResetName:false})}}/>*/}
                                    {/*</span>:*/}
                                    {/*<span>*/}
                                    {/*<span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;*/}
                                    {/*<Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>*/}
                                    {/*</span>*/}
                                    {/*}*/}
                                    <span>
                                    <span className="my-name">{info?info.username:""}</span>&nbsp;&nbsp;
                                        {/*<Icon type="edit" theme="outlined" onTouchStart={()=>{this.setState({isResetName:true})}}/>*/}
                                    </span>
                                </p>
                                <p>
                                    签名：{info?info.uid:0}
                                </p>
                                <p>
                                    胜负：{info?info.victory+"/"+info.total_office+"("+this.state.victoryRate+")":0}
                                    <Button className="open-reset-modal" onTouchStart={()=>{this.setState({isResetMyInfo:true})}}>编辑</Button>
                                </p>
                            </div>
                            <div className="my-account">
                                <span>我的账号：</span><span></span>
                            </div>
                        </div>
                        <div className="my-class-medal">
                            <div className="my-class my-progress">
                                <p>等级:(12/32)</p>
                                <img src={require("../../../layouts/image/star.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                            <div className="my-medal my-progress">
                                <p>勋章数:(3/16)</p>
                                <img src={require("../../../layouts/image/medal1.png")} alt=""/>
                                <Progress successPercent={30} />
                            </div>
                        </div>
                    </div>
                    <Icon onTouchStart={()=>this.props.openModal(false)} type="close-circle" theme="outlined" />
                </Modal>
                <Modal entered={true} visible={this.state.isResetMyInfo||this.props.isResetMyInfo} wrapClassName={"my-info-modal reset-my-info"}
                       closable={false} destroyOnClose={true}>
                    <p className="reset-my-info-container">编辑资料
                        <Icon type="close" theme="outlined" onTouchStart={()=>this.getUserInfo()}
                        />
                    </p>
                    <div className="reset-info-item">
                        <div>
                            <Avatar size={64} shape="square" icon="user" src={info?this.state.header:require("../../../layouts/image/head.png")} />
                        </div>
                        <div>
                            <Upload accept={"image/*"} onChange={(file)=>this.changeHeader(file)} showUploadList={false} beforeUpload={()=>{return false}}>
                                <Button className="reset-myhead">上传文件</Button>
                            </Upload>
                        </div>
                        <div>
                            <span>昵称：</span><Input onChange={(e)=>this.resetMyInfo(e,"myName")} defaultValue={info.username}/>
                        </div>
                        <div>
                            <span>签名：</span><Input onChange={(e)=>this.resetMyInfo(e,"signature")} defaultValue={info.signature}/>
                        </div>
                        <div className="bind-item">
                            <span>绑定：</span><span className="binding"></span>
                        </div>
                        <Button onClick={()=>this.saveInfo()} className="save-reset">保存</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default MyInfoModal