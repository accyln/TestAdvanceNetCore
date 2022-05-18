import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col } from 'react-bootstrap'
import { Doughnut,Line,Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,Title } from 'chart.js';
import { BasePage } from './base/basepage';
Chart.register(ArcElement,Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,Title);

class Home extends BasePage {

  constructor(props){
    super(props);
    this.connect(['authReducers']);
    this.state = {
      ...this.state,
      moduls:[], 
      addModalShow:false,
      navDisplay:true,
      chartDisplay:"",
      pass:0,
      fail:0,
      warning:0,
      tarih:"",
      chartData:{},
      testResultDashboard:[],
      gunlukResult:[],
      loading:true
    }

    this.getGunlukSonuc = this.getGunlukSonuc.bind(this);
    this.getHaftalıkSonuc = this.getHaftalıkSonuc.bind(this);
      
    }

     componentDidMount(){
       this.getGunlukSonuc();
       this.getHaftalıkSonuc();
     
    }

  /* getHaftalıkSonuc() {
    fetch('api/TestRun/GetTestResultDashboard').then(response=> response.json())
        .then(
            data => {
                if (data) {
                  debugger;
                    this.setState({
                        ...this.state,
                        testResultDashboard: data,
                        loading:false
  
                    });
                }
            });
  }; */

  getHaftalıkSonuc() {
    debugger;
    this.GetSecureBase('api/TestRun/GetTestResultDashboard',this.state?.userInfo?.token)
        .then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        testResultDashboard: data,
                        loading:false
  
                    });
                }
            });
  };


  getGunlukSonuc() {
    debugger;
    this.GetSecureBase('api/TestRun/GetTestResultGunlukDashboard?testRunDate=2022-04-22',this.state?.userInfo?.token)
        .then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        gunlukResult: data,
                        pass:data.pass,
                        fail:data.fail,
                        loading:false
  
                    });
                }
            });
  };



  render () {
    let totalcase=this.state.pass+this.state.fail;
    return (

      <div>
        <Row>
          <Col sm={5}>
            <Card>
              <Card.Header>Testlerin Başarı Oranı</Card.Header>
              <Card.Body>
      <div className="App" style={{margin:20}}>
        <div className="chart-container" style={{marginLeft:100,height:500, width:500}}>
         <Pie
          data={{
            labels: ['Pass', 'Fail'],
            datasets:[
              {
                label:'Başarı Oranı',
                data:[
                  this.state.pass/totalcase*100,
                  this.state.fail/totalcase*100
                ],
                backgroundColor:[
                  'rgba(3, 166, 120,0.8)',
                  'rgba(255, 99, 132, 1)'
                ]
              }
            ]
          }}
          options={{
            title:{
              display:true,
              text:'Test Advance Sonuç Dağılımı',
              fontSize:25
            },
            legend:{
              display:true,
              position:'right'
            },
            datalabels: {
              display: true,
              color: "white",
            },
          }}  />
      </div>
      </div>
      </Card.Body>
      </Card>
      
      </Col>
      <Col sm={5}>
      <Card style={{width:1100}}>
              <Card.Header>Başarı Trendi</Card.Header>
              <Card.Body>
      <div className="aadd" style={{margin:20}}>
        <div className="chart-containerr" style={{height:500, width:1000}}>
          
      <Line data={{
            labels: this.state.testResultDashboard.map((tt) => tt.testRunDate),
            datasets:[
              {
                label:'Başarı Oranı',
                data:this.state.testResultDashboard.map((tt) => (tt.pass/(tt.pass+tt.fail)*100)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
              }
            ]
          }}
      options = {{
        width:500,
        height:500,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Son 7 günlük başarı oranı trendi',
          },
        },
      }} />
      </div>
      </div>
      </Card.Body>
      </Card>
      </Col>
      
          </Row>
      </div>
    );
  }
} export default Home;
