import React from "react";
import { Route } from "react-router-dom";
import MyLoadingComponent from "~/components/common/loadComponents";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "./Dashboard.less";
// import Websocket from 'react-websocket';
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
        path: "GameHome/:homeId",
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
        path: "MyMedal/:id",
        component: Loadable({
            loader: () => import("~/container/MyMedal/MyMedal"),
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
        };
    }

    componentDidMount(){
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
            // message.error(err.msg);
        })
    }


    handleData(data) {
        console.log(data)
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
            console.log(data,userData)
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

const mapStateToProps = state => {
    const { getDictReducer } = state;
    return { getDictReducer };
};
export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;
