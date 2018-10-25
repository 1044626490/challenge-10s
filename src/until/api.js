import 'whatwg-fetch';
import * as C from '~/constants/api';
import employApi from "./employApi"
import {post, request, getDateOrTime} from "./apiMethod";


export default {
    getDateOrTime,
    getLoginCaptcha: (params, headers) => request(C.GET_LOGIN_CAPTCHA, params, headers),
    login: (params) =>post(C.LOGIN, params),
    logout: (params) => post(C.LOGOUT, params),
    register: (params) => post(C.REGISTER, params),
    sendRandomCaptcha: (params) => post(C.SENDCAPTCHA, params),
    forgetPassword: (params) => post(C.FORGETPASSWORD, params),
    ...employApi,
}