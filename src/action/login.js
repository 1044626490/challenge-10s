import Api from '~/until/api';
import * as C from '~/constants/action'

const fetchPosts = (params) => dispatch => {
    return new Promise(function (resolve, reject) {
        Api.login(params).then((res) => {
            dispatch({
                type: C.LOGIN_INFORMATION,
                data: Object.assign({}, res)
            });
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
};

export const fetchPostsIfNeeded = params => (dispatch) => {
    return dispatch(fetchPosts(params))
};