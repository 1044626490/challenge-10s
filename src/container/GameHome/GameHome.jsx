import React from "react"
import HeaderNav from "../../components/headerNav/headerNav";
import { Modal } from "antd"
import connect from "react-redux/es/connect/connect";

class GameHome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAddAdmission:true,
            isAddBet:false,
            userInfo:this.props.userInfo.data
        }
    }

    render(){
        return(
            <div className="game-home-wrap">
                <HeaderNav name={""}/>
                <div>
                    <div className="game-home-header">
                        <img src="" alt=""/>
                        <p>

                        </p>
                    </div>
                    <div className="game-menber">
                        <div>

                        </div>
                        <div className="menber-item">

                        </div>
                    </div>
                </div>
                <Modal>
                    <div className={!this.state.isAddAdmission?"":this.state.isAddBet?"admission-price bet-price":"admission-price"}>

                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(GameHome)