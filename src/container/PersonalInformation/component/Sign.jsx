import React from "react"
import {Icon, Modal} from "antd";
import "./Sign.less"
import $ from "jquery";

class Sign extends React.Component{
    constructor(props) {
        super(props);
        this.setI = null;
        this.state = {
            num:3
        }
    }

    componentDidMount(){
        // $(".fireworks_f,.fireworks_s,.fireworks_t,.fireworks_fo").animate(
        //     {
        //         transform:"scale(1)"
        //     },300).delay(500).animate()
    }

    render(){
        return(
            <div>
                <Modal entered={true} visible={true}  wrapClassName={"all-modal sign-in-wrap"}
                       closable={false} destroyOnClose={true}>
                    <span className="fireworks_f"><img src={require("../../../layouts/image/01.png")} alt=""/></span>
                    <span className="fireworks_s"><img src={require("../../../layouts/image/02.png")} alt=""/></span>
                    <span className="fireworks_t"><img src={require("../../../layouts/image/03.png")} alt=""/></span>
                    <span className="fireworks_fo"><img src={require("../../../layouts/image/04.png")} alt=""/></span>
                    <Icon className="close-modal" onClick={null} type="close" theme="outlined" />
                    <div className="player-info">
                        <div className="content">
                            <div className="line-box">
                                <div className="number">
                                    <div className="top-num">
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                    </div>
                                    <div className="bottom-num">
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                        <span>11</span>
                                        <span>12</span>
                                        <span>13</span>
                                        <span>14</span>
                                    </div>
                                </div>
                                <div className="curve-top">
                                </div>
                                <div className="curve-small-right-bottom">
                                </div>
                            </div>
                            <div className="line-box">
                                <div className="curve-small-left-top">
                                </div>
                                <div className="curve-small-left-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        <span>15</span>
                                        <span>16</span>
                                        <span>17</span>
                                        <span>18</span>
                                        <span>19</span>
                                        <span>20</span>
                                        <span>21</span>
                                    </div>
                                </div>
                            </div>
                            <div className="line-box">
                                <div className="curve-small-right-top">
                                </div>
                                <div className="curve-small-right-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        <span>22</span>
                                        <span>23</span>
                                        <span>24</span>
                                        <span>25</span>
                                        <span>26</span>
                                        <span>27</span>
                                        <span>28</span>
                                    </div>
                                </div>
                            </div>
                            <div className="line-box">
                                <div className="curve-small-left-top">
                                </div>
                                <div className="curve-small-left-bottom">
                                </div>
                                <div className="number">
                                    <div className="bottom-num">
                                        <span>29</span>
                                        <span>30</span>
                                        <span>31</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sign-progress">
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Sign