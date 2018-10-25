/**
 * @component  Login
 * 登录组件
 * */
import React from 'react';
import {Form, Icon, Input, Button, Col, Row, message} from 'antd';
import './login.less';
import {fetchPostsIfNeeded} from '~/action/login';
import Api from '~/until/api';
import {login_Popup} from '~/action/loginPopup';
import * as Message from '~/components/common/message'
import {connect} from 'react-redux'
const FormItem = Form.Item;


class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imgSrc: '',
            confirmDirty: false,
            issend:true,
            seconds: 60,
            tipTxt: "点击获取验证码",
            isclo:false
        }
    }

    componentWillMount() {
        this.getLoginCaptcha();
    }

    componentWillReceiveProps(nextProps) {

    }

    getLoginCaptcha = () => {
        Api.getLoginCaptcha().then((blob) => {
            let url = URL.createObjectURL(blob);
            this.setState({
                imgSrc: url
            })
        });
    };
    //确认密码输入
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_~!@#$]{8,18}$/;
        if(!password.test(value)){
            callback('密码为八到十八位数字加字母的组合');
        } else if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
            callback();
        }
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;

        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Api.register(values).then((res)=>{
                    if(res.status==="1"){
                        message.success(res.message);
                        this.props.isRegister(false)
                    }
                }).catch((err) => {
                    this.getLoginCaptcha();
                    this.props.form.setFieldsValue({"phone":'',"password": '','rePassword':'','captcha':''});
                    Message.error(err.message);
                    this.setState({
                        isclo:true
                    });
                })
            }else {
            }

        });
    };
    turn(){
        this.props.forget(true);
        this.props.form.setFieldsValue({"phone": '','password':'','rePassword':'','captcha':''});
    }
    register(){
        this.props.isRegister(false);
    }
    getTelCaptcha(e){
        e.preventDefault();
        const _this = this;
        console.log(1)
        let tel =_this.props.form.getFieldValue("usercode");
        this.setState({
            isclo:false
        });
        if(tel===undefined){

        }else {

            Api.sendRandomCaptcha({"usercode":tel}).then((res)=>{
                message.success(res.message)
               // 发送验证码成功
                    // 显示60s倒计时
                    const timer = setInterval(() => {
                        _this.setState((preState) => {
                            return {
                                seconds: preState.seconds - 1,
                                tipTxt: `${_this.state.seconds}s后`
                            }
                        }, () => {
                            if (_this.state.seconds < 0 || this.state.isclo ===true) {
                                clearInterval(timer);
                                _this.setState({
                                    seconds: 60,
                                    tipTxt: "点击获取验证码"
                                });
                            }
                        });
                    }, 1000);
            }).catch(res => {
                message.error(res.message)
            });

        }

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    <Row gutter={12}>
                        <Col span={18}>
                            {getFieldDecorator('usercode', {
                                rules: [{required: true, message: '请输入手机号!'}],
                            })(
                                <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="手机号"/>
                            )}
                        </Col>
                        <Col span={2}>
                            {this.state.seconds == 60?<Button onClick={(e)=>this.getTelCaptcha(e)}  style={{height:'40px',borderColor:"#d9d9d9"}} >发送</Button>:
                                <Button style={{height:'40px',borderColor:"#d9d9d9"}} > {this.state.tipTxt}</Button>}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '输入密码 '}, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('rePassword', {
                        rules: [{required: true, message:'确认密码!'},{
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="确认密码"
                               onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('captcha', {
                        rules: [{required: true, message: '输入验证码'}],
                    })(
                        <Input   placeholder="手机验证码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                       注册
                    </Button>
                    <span > 或</span> <a href="javascript:;" onClick={()=>this.register()} >登录</a>
                </FormItem>
            </Form>
        );
    }
}

const RegisterWrapper = Form.create()(Register);

export default RegisterWrapper;
