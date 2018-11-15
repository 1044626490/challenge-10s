import React from "react";
import { Route } from "react-router-dom";
import MyLoadingComponent from "~/components/common/loadComponents";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "./Dashboard.less";
import Api from '~/until/api';
import $ from "jquery"
import "./style.css"
import {fetchPostsGetUser} from '~/action/getUserInfo';

const routes = [
    {
        path: "Index",
        component: Loadable({
            loader: () => import("~/container/Index/index"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },{
        path: "Activity",
        component: Loadable({
            loader: () => import("~/container/Activity/Activity"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "PersonalInformation",
        component: Loadable({
            loader: () => import("~/container/PersonalInformation/PersonalInformation"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "Setting",
        component: Loadable({
            loader: () => import("~/container/PersonalInformation/component/Setting"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "NewHome/:id",
        component: Loadable({
            loader: () => import("~/container/NewHome/NewHome"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "GameHome/:homeId/:status",
        component: Loadable({
            loader: () => import("~/container/GameHome/GameHome"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "MyFriend/:pageId",
        component: Loadable({
            loader: () => import("~/container/MyFriend/MyFriend"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "PayPage",
        component: Loadable({
            loader: () => import("~/container/Index/PayPage/PayPage"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "MyMedal",
        component: Loadable({
            loader: () => import("~/container/MyMedal/MyMedal"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
    {
        path: "RankList",
        component: Loadable({
            loader: () => import("~/container/RankList/RankList"),
            loading: MyLoadingComponent
        }),
        isExact: false
    }
    // {
    //     path: "PayPriceOver/:price/:id",
    //     component: Loadable({
    //         loader: () => import("~/container/Index/PayPage/PayPriceOver"),
    //         loading: MyLoadingComponent
    //     }),
    //     isExact: false
    // }
];
let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
if (ua.match(/MicroMessenger/i) == "micromessenger") {
    routes.push({
        path: "PayPriceOver/:price/:id",
        component: Loadable({
            loader: () => import("~/container/Index/PayPage/PayPriceOver"),
            loading: MyLoadingComponent
        }),
        isExact: false
    })
}
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        let href = window.location.href;
        Api.getUserInfo().then().catch(err => {
            if(window.location.href.indexOf("#/Dashboard/index") >= 0){
                if(window.location.hash.indexOf("?uid=") >= 0){
                    let reg2 = /([^=]+)$/;
                    let openid = window.location.hash.match(reg2);
                    localStorage.setItem("uid",openid[0])
                }
            }else {
                window.location.href = "#/Dashboard/index"
            }
        });
        // this.props.dispatch(fetchPostsGetUser()).then((res) => {
        // }).catch((err) => {
        //     window.location.href = "#/Dashboard/index"
        // })
        this.progress();
    }

    progress(){
        let winWidth = window.innerWidth?window.innerWidth:document.body.clientWidth;
        // if (window.innerWidth){
        //     winWidth = window.innerWidth;
        // } else if ((document.body) && (document.body.clientWidth)){
        //     winWidth = document.body.clientWidth;
        // }
        $(function() {
            $('.progressbar').each(function(){
                let t = $(this),
                    dataperc = t.attr('data-perc'),
                    // width = $(".progressbar").width(),
                    width = winWidth*0.7,
                    barperc = Math.round(dataperc*1.6);
                t.find('.bar').css({width:0}).animate({width:width}, 3000);
                t.find('.label').append('<div class="perc"></div>');
            });
        })
        $('.splash-screen').delay(3000).animate({
            opacity: 0,
        },300)
        let setT = setTimeout(()=>{
            $('.splash-screen').css({
                display: "none"
            });
            clearTimeout(setT)
        },3300)
    }

    render() {
        const { match } = this.props;
        const RouteWithSubRoutes = route => (
            <Route
                exact={route.isExact}
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );
        return (
            <div className="container">
                <div className="splash-screen">
                    <div className="progressbar" data-perc="100">
                        <div className="bar"><span></span></div>
                        <div className="label"><span></span></div>
                    </div>
                </div>
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     const {userInfo} = state;
//     return {userInfo}
// };
// export default connect(mapStateToProps)(Dashboard)
export default Dashboard
