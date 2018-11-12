import React from "react";
import { Route } from "react-router-dom";
import MyLoadingComponent from "~/components/common/loadComponents";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { Progress } from "antd"
import "./Dashboard.less";
import Api from '~/until/api';
import $ from "jquery"
// import Websocket from 'react-websocket';
import "./style.css"
import {message} from "antd";
import {fetchPostsGetUser} from '~/action/getUserInfo';
import { jsSdkConfig } from "../../constants/Share.js"

const routes = [
    {
        path: "Index",
        component: Loadable({
            loader: () => import("~/container/Index/index"),
            loading: MyLoadingComponent
        }),
        isExact: false
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
    },
    {
        path: "MyTask",
        component: Loadable({
            loader: () => import("~/container/MyTask/MyTask"),
            loading: MyLoadingComponent
        }),
        isExact: false
    }
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            userInfo:null,
        };
    }

    componentDidMount(){
        // if(!this.state.userInfo){
        //     Api.getUserInfo().then((res) => {
        //         this.setState({
        //             userInfo:res.data
        //         });
        //     }).catch((err) => {
        //         this.progress();
        //         window.location.hash !== "#/Dashboard/index"?window.location.href = "#/Dashboard/index":null
        //     })
        // }
        this.progress();
    }

    progress(){
        $(function() {
            $('.progressbar').each(function(){
                let t = $(this),
                    dataperc = t.attr('data-perc'),
                    width = $(".progressbar").width(),
                    barperc = Math.round(dataperc*1.6);
                t.find('.bar').animate({width:width}, 3000);
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
                // exact={route.isExact}
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );
        return (
            <div className="container">
                {/*{*/}
                    {/*this.state.userInfo?null:null*/}
                {/*}*/}
                <div className="splash-screen">
                    <div className="progressbar" data-perc="100">
                        <div className="bar"><span></span></div>
                        <div className="label"><span></span></div>
                    </div>
                </div>
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes isLogin={123} key={i} {...route} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Dashboard
