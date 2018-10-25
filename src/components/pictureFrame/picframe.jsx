import React from "react";
import { Row, Col,Card,Tabs,Tag,Modal } from "antd";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
const TabPane = Tabs.TabPane;
const colorList = [
  "#ffaf37",
  "#fd5621",
  "#ffaf37",
  "#fd227c",
  "#fd227c",
  "#fd5621",
  "#7f0ed2",
  "#01cd9a",
  "#02c5fb",
  "#8bc24a",
  "#01cd9a",
  "#02c5fb",
  "#8bc24a",
  "#fd5621"
];
class PicCharte extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          list:[],
          detailsVisible:false,
          rankName:''
        }
      }
      componentWillReceiveProps(nextprops) {
        if(this.props !== nextprops) {
        //   this.list = nextprops.list;
          this.setState({
            list: nextprops.list,
            // detailsVisible: nextprops.detailsVisible,
            rankName:nextprops.rankName
          });
        }
    }
    handleChange(){
        this.props.changevisible(false)
    }
  render() {
    return (
      <div>
           <Modal
          className='skill-content'
          visible={this.props.detailsVisible}
          width={700}
          bodyStyle={{padding:0}}
          style={{textAlign:'center',border:"1px solid  #00bf8f",padding:0 }}
          title={`${this.state.rankName}-技能得分`}
          centered={true}
          footer={null}
          onCancel={this.handleChange.bind(this)}
          >
            <Tabs
                defaultActiveKey="1"
                tabBarStyle={{ fontSize: 14,textAlign:'left',padding:0, height:'42px',paddingLeft:75}}
            >
                {this.state.list.map(item => {
                  return (
                    <TabPane tab={item.type==1?'技术 ':item.type==2?'素质':'其他'} key={item.type} className="">
                      <Row>
                        <Col span={16}>
                         
                          <Row>
                            <BarChart
                              className="inspection-barChart"
                              maxBarSize={30}
                              width={650}
                              height={350}
                              margin={{top:30,left:5}}
                              padding={{left:0}}
                              data={item.list}
                            >
                              <XAxis dataKey="skillColumnName" />
                              <YAxis />
                              <Bar dataKey="skillColumnScore" label={{ position: 'top' }}>
                              {item.list.map(
                              (itm, index) => {
                                return (
                                  <Cell
                                    fill={colorList[index]}
                                    key={index}
                                  />
                                );
                              }
                            )}
                              </Bar>
                            </BarChart>
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                  );
                })}
              </Tabs>
          </Modal>
      </div>
    );
  }
}

export default PicCharte;