import {Route, Switch, Router, Redirect} from "react-router-dom";
import React, {Component} from "react";
import history from "./history";
import Loadable from 'react-loadable';
import MyLoadingComponent from '~/components/common/loadComponents';

// const Login = Loadable({
//     loader: () => import('~/container/Login/Login'),
//     loading: MyLoadingComponent
// });
const Dashboard = Loadable({
    loader: () => import('~/container/Dashboard/Dashboard'),
    loading: MyLoadingComponent
});

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {/*<Route exact path="/" component={Dashboard}/>*/}
                    <Route  path="/Dashboard" component={Dashboard}/>
                    {/*<Route exact path="/" component={Dashboard}/>*/}
                    {/*<Route path="/Dashboard" component={Dashboard}/>*/}
                    <Redirect to="/Dashboard/index"/>
                </Switch>
            </Router>
        )
    }
}

export default Routes