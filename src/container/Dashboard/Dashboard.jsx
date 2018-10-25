import React from "react";
import { Route } from "react-router-dom";
import MyLoadingComponent from "~/components/common/loadComponents";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "./Dashboard.less"
// import {message} from "antd";
// import {fetchPostsGetUser} from '~/action/getUserInfo';

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
        path: "NewHome/:id",
        component: Loadable({
            loader: () => import("~/container/NewHome/NewHome"),
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

    // componentDidMount(){
    //     this.props.dispatch(fetchPostsGetUser()).then((res) => {
    //         console.log(res)
    //     }).catch((err) => {
    //         message.error(err.msg);
    //     })
    // }

    render() {
        const { match } = this.props;
        const RouteWithSubRoutes = route => (
            <Route
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );
        // let val = sessionStorage.getItem("key");
        return (
            <div className="container">
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
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
