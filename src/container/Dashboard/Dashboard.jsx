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
        isExact: true
    },
    {
        path: "PersonalInformation",
        component: Loadable({
            loader: () => import("~/container/PersonalInformation/PersonalInformation"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "Setting",
        component: Loadable({
            loader: () => import("~/container/PersonalInformation/component/Setting"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "NewHome/:id",
        component: Loadable({
            loader: () => import("~/container/NewHome/NewHome"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "GameHome/:homeId/:status",
        component: Loadable({
            loader: () => import("~/container/GameHome/GameHome"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "MyFriend/:pageId",
        component: Loadable({
            loader: () => import("~/container/MyFriend/MyFriend"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "PayPage",
        component: Loadable({
            loader: () => import("~/container/Index/PayPage/PayPage"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "PayPriceOver/:id/:price",
        component: Loadable({
            loader: () => import("~/container/Index/PayPage/PayPriceOver"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "MyMedal",
        component: Loadable({
            loader: () => import("~/container/MyMedal/MyMedal"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },
    {
        path: "RankList",
        component: Loadable({
            loader: () => import("~/container/RankList/RankList"),
            loading: MyLoadingComponent
        }),
        isExact: true
    }
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        // this.props.dispatch(fetchPostsGetUser()).then((res) => {
        // }).catch((err) => {
        //     window.location.href = "#/Dashboard/index"
        // })
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

    // componentWillReceiveProps(nextProps){
    //     console.log(this.props === nextProps,nextProps,this.props)
    //     if(this.props === nextProps){
    //         return false
    //     }else {
    //         return true
    //     }
    // }

    render() {
        const { match } = this.props;
        const RouteWithSubRoutes = route => (
            <Route
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
