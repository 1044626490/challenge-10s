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
            count: 90,
            isLogin:false,
            userInfo:null,
        };
    }

    componentDidMount(){
        Api.getUserInfo().then((res) => {
            this.setState({
                userInfo:res.data
            });
        }).catch((err) => {
            // message.error(err.msg);
            this.progress()
            window.location.hash !== "#/Dashboard/index"?window.location.href = "#/Dashboard/index":null
        })
    }

    progress(){
        // let setI = setInterval(()=>{
        //     count += 1;
        //     this.setState({
        //         progress:count
        //     });
        //     if(count === 100){
        //         clearInterval(setI)
        //     }
        // },30)
        $(function() {

            $('.progressbar').each(function(){
                let t = $(this),
                    dataperc = t.attr('data-perc'),
                    width = $(".progressbar").width(),
                    barperc = Math.round(dataperc*1.6);
                t.find('.bar').animate({width:width}, 3000);
                t.find('.label').append('<div class="perc"></div>');

                // function perc(){
                //     let length = $(".bar").width(),
                //         perc = Math.round(parseInt(length)/width*100),
                //         labelpos = (parseInt(length)-25);
                //     t.find('.label').css('left', labelpos);
                //     t.find('.perc').text(perc+'%');
                // }
                // perc();
                // setInterval(perc, 0);
            });

        })
        $('.splash-screen').delay(3000).animate({
            opacity: 0,
        },1000)
        let setT = setTimeout(()=>{
            $('.splash-screen').css({
                display: "none"
            });
            clearTimeout(setT)
        },4100)
        // let count =0;
    }

    handleData(data) {
        // if(data.){
        //
        // }
        // let result = JSON.parse(data);
        // this.setState({count: this.state.count + result.movement});
    }

    getWebSocket(){
        let ws = new WebSocket("ws://www.10sgame.com:8282");
        ws.onopen = ()=>{
            let data = '{"type":"join_room","uid":1,"room_id":123456,"level_room":1}'
            ws.send(data)
        }
        ws.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let userData = data.data?JSON.parse(data.data):null
            let type = data.type || "";
            switch (type) {
                case "ping":

                    break;

                case 'active':
                    let user_data = JSON.parse(data.data);

                    break;

                case 'leave':
                    let user_datas = JSON.parse(data.data);

                    break;
                default:
                    break;
            }
        }
    }

    render() {
        // this.getWebSocket();
        const { match } = this.props;
        const RouteWithSubRoutes = route => (
            <Route
                exact={route.isExact}
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );

        // let val = sessionStorage.getItem("key");
        return (
            <div className="container">
                {
                    this.state.userInfo?null:<div className="splash-screen">
                        {/*{()=>this.progress()}*/}
                        {/*<Progress percent={this.state.progress} status="active" />*/}
                        <div className="progressbar" data-perc="100">
                            <div className="bar"><span></span></div>
                            <div className="label"><span></span></div>
                        </div>
                    </div>
                }
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes isLogin={123} key={i} {...route} />
                    ))}
                </div>
                {/*<Websocket url='ws://www.10sgame.com:8282'*/}
                           {/*required={{"type":"join_room","uid":1,"room_id":123456,"level_room":1}}*/}
                           {/*OnOpen ={{"type":"join_room","uid":1,"room_id":123456,"level_room":1}}*/}
                           {/*onMessage={this.handleData.bind(this)}/>*/}
            </div>
        );
    }
}

// export default Dashboard
// const mapStateToProps = state => {
//     const {userInfo} = state;
//     return {userInfo}
// };
// export default connect(mapStateToProps)(Dashboard)
export default Dashboard;
