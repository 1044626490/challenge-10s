/**
 * @component  Login
 * 登录组件
 * */
import React from 'react';
import {Form, Icon, Input, Button, Col, Row,Modal} from 'antd';
import './login.less';
import {fetchPostsIfNeeded} from '~/action/login';
import Api from '~/until/api';
import * as Message from '~/components/common/message'
import {login_Popup} from '~/action/loginPopup';
import {connect} from 'react-redux'
import x from "~/layouts/image/employ/X.png"
import Register from "./register"
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps){
        // console.log(this.props.login_pop,nextProps.login_pop,4545)
        if(this.props.login_pop!=nextProps.login_pop){
            // console.log(111)
            this.setState({
                visible:nextProps.login_pop
            })
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal>

                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer} = state;
    return {loginReducer}
};
const LoginWrapper = Form.create()(Login);
export default connect(mapStateToProps)(LoginWrapper)