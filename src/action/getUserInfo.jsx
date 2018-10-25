import Api from '~/until/api';
import * as C from '~/constants/action'

const fetchPosts = (params) => dispatch => {
    return new Promise(function (resolve, reject) {
        console.log(resolve,reject)
        Api.getUserInfo(params).then((res) => {
            dispatch({
                type: C.GET_USERINGO,
                data: Object.assign({}, res)
            });
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
};

export const fetchPostsGetUser = params => (dispatch) => {
    return dispatch(fetchPosts(params))
};