import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Modal } from "antd"
import "./MyTask.less"

class MyTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <HeaderNav name="挑战10秒"/>
                <Modal entered={true} visible={true} mask={false} wrapClassName={"all-modal"}
                       closable={false} destroyOnClose={true}>
                    {/*all-modal*/}
                </Modal>
            </div>
        )
    }
}

export default MyTask