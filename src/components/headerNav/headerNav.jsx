import {Icon} from "antd";
import React from "react";
import history from "~/history";
import { Carousel, Button } from "antd"
import "./headerNav.less"
import $ from "jquery"

// let num = [1];
// let num1 = 1;
class HeaderNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num:["玩家阿狸大大获得百胜成就"],
            num1:"玩家阿狸大大获得百胜成就",
        }
    }

    goBackHistory(e){
        console.log(e,window.location.hash);
        window.location.hash === "#/Dashboard/index"?window.location.href = "#/Dashboard/index":history.go(-1);
    }

    componentDidMount(){
    }

    Carousel(){
        let num = this.state.num;
        let num1 = this.state.num1;
        console.log($(".carousel-item").is(":animated"))
        if(!$(".carousel-item").is(":animated")){
            let a = Math.random()
            num1.concat(a);
            num.push(num1);
            this.setState({
                num,
                num1
            });
            $(".carousel-item").animate(
                {
                    marginTop:-20
                },200);
            let setT = setTimeout(()=>{
                this.refresh();
                clearTimeout(setT)
            },220);
            console.log(num1,num)
        }else {
            let setT = setTimeout(()=>{
                num1++;
                num.push(num1);
                this.setState({
                    num,
                    num1
                });
                $(".carousel-item").animate(
                    {
                        marginTop:-20
                    },300);
                let setT = setTimeout(()=>{
                    this.refresh();
                    clearTimeout(setT)
                },320);
                clearTimeout(setT)
            },300)
        }
    }

    refresh(){
        let num = this.state.num;
        if(num.length > 1){
            console.log(12313);
            num.splice(0,1);
            this.setState({
                num
            })
        }
        if(num.length === 1){
            let setT = setTimeout(()=>{
                $('.carousel-item').animate(
                    {
                        marginTop:-20
                    },300);
                num.splice(0,1);
                clearTimeout(setT)
            },3000);
            let setTT = setTimeout(()=>{
                this.setState({
                    num
                });
                clearTimeout(setTT)
            },3320);
        }
        $('.carousel-item').animate(
            {
                marginTop:0
            },0)
    }

    render() {
        return (
            <div className="top-header">
                <div className="top-name">
                    {
                        window.location.hash === "#/Dashboard/index"?null:<span onClick={(e)=>this.goBackHistory(e)}><Icon type="left" theme="outlined" />返回</span>
                    }
                    <p>
                        {this.props.name}
                    </p>
                    <Icon type="ellipsis" theme="outlined" />
                </div>
                <div className="carousel-info-wrap">
                    {
                        this.state.num.map((item, index) => {
                            return <p className={index === 0?"carousel-item":""} key={index}>
                                <span className="trumpet"></span>
                                <span>{item.slice(0,2)}</span>
                                <span style={{color:"rgba(222,204,53,0.7)"}}>{item.slice(2,6)}</span>
                                <span>{item.slice(6,item.length)}</span>
                            </p>
                        })
                    }
                </div>
                {/*<button style={{marginTop:30}} onClick={()=>this.Carousel()}>123</button>*/}
            </div>
        )
    }
}

export default HeaderNav