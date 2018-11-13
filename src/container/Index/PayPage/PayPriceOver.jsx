import React from "react"
import HeaderNav from "../../../components/headerNav/headerNav";
import { Radio, InputNumber, Button  } from "antd"

const RadioGroup = Radio.Group;

class PayPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            price:null,
            value:0,
        }
    }

    componentDidMount(){
        let id = this.prop.match.params.id;
        this.setState({
            price:this.props.match.params.price
        });
        this.payPrice(id)

    }

    payPrice(id){
        if(id === "1"){

        }else if(id === "2"){

        }else {

        }
    }

    render(){
        return(
            <div className="pay-over-wrap">
                <HeaderNav name="挑战10秒"/>
                <a href=""></a>
            </div>
        )
    }
}

export default PayPage