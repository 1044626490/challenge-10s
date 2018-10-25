import React from 'react';
import connect from "react-redux/es/connect/connect";
import HeaderNav from "../../components/headerNav/headerNav";
import BottomMenu from "../../components/bottomMenu/bottonMenu";

class NewHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header:""
        };
    }

    componentDidMount(){
        console.log(this.props.match)
        let id = this.props.match.params.id;
        let header = id === "0"?"初级房间":id === "1"?"中级房间":id === "2"?"高级房间":""
        this.setState({
            header
        })
    }

    render(){
        return (
            <div>
                <HeaderNav name={this.state.header}/>
                <BottomMenu />
            </div>
        )
    }
}

export default NewHome