import {Icon} from "antd";
import React from "react";
import history from "~/history";
import { Carousel } from "antd"
import "./headerNav.less"

class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:[1],
            num1:1,
        }
    }

    goBackHistory(e){
        console.log(e,window.location.hash);
        window.location.hash === "#/Dashboard/index"?window.location.href = "#/Dashboard/index":history.go(-1);
    }

    // componentDidMount(){
    //     setInterval(()=>{
    //         let num = this.state.num;
    //         let num1 = this.state.num1;
    //         num1++;
    //         if(this.state.num.length > 1){
    //             num.splice(0,1)
    //         }
    //         num.push(num1);
    //         this.setState({
    //             num,
    //             num1
    //         })
    //     },3000)
    // }
    //
    // Carousel = () => {
    //     let num = this.state.num;
    //     let num1 = this.state.num[0];
    //     num1++;
    //     console.log(num1,123123)
    //     num.unshift(num1);
    //     this.setState({
    //         num
    //     })
    // }

    render() {
        // console.log(this.state.num);
        // let num = this.state.num;
        return (
            <div className="top-header">
                <div className="top-name">
                    <span onTouchStart={(e)=>this.goBackHistory(e)}><Icon type="left" theme="outlined" />返回</span>
                    <p>
                        {this.props.name}
                    </p>
                    <Icon type="ellipsis" theme="outlined" />
                </div>
                {/*<Carousel slickGoTo={this.goTo(this.state.num.length-1, true)} vertical autoplay={true} dots={false}>*/}
                    {/*{*/}
                        {/*this.state.num.map((item, index) => {*/}
                            {/*return <div><h3>{item}</h3></div>*/}
                        {/*})*/}
                    {/*}*/}
                {/*</Carousel>*/}
                {/*<div>*/}
                {/*</div>*/}
                {/*<button onClick={()=>this.Carousel()}>123</button>*/}
            </div>
        )
    }
}

export default HeaderNav