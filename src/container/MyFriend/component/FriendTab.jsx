import React from "react"

class FriendTab extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                {this.props.key}
            </div>
        )
    }
}

export default FriendTab