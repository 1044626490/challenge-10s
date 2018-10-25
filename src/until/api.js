import 'whatwg-fetch';
import * as C from '~/constants/api';
// import employApi from "./employApi"
import {post, request, getDateOrTime} from "./apiMethod";


export default {
    getDateOrTime,
    // getLoginCaptcha: (params, headers) => request(C.GET_LOGIN_CAPTCHA, params, headers),
    login: (params) =>post(C.LOGIN, params),
    register: (params) =>post(C.REGISTER, params),
    sendVerifiCode: (params) =>post(C.SEND_VERIFI_CODE, params),
    getLeaderBoard: (params) =>post(C.GET_LEADER_BOARD, params),
    getUserMedal: (params) =>post(C.GET_USER_MEDAL, params),
    getUserInfo: (params) =>post(C.GET_USER_INFO, params),
    editUsername: (params) =>post(C.EDIT_USERNAME, params),
    coupon: (params) =>post(C.COUPON, params),

    // logout: (params) => post(C.LOGOUT, params),
    // register: (params) => post(C.REGISTER, params),
    // sendRandomCaptcha: (params) => post(C.SENDCAPTCHA, params),
    // forgetPassword: (params) => post(C.FORGETPASSWORD, params),
    // ...employApi,
}