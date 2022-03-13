import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button,ButtonToolbar,Badge,Spinner } from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay';
import Test from './Test';

class TestSonuclari extends Component {
    displayName = TestSonuclari.name

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            before: {},
            after: {},
            searchText: '',
            filteredData: [],
            regression: [],
            loading:true,
            runModalShow:false
        };


        this.getApiList = this.getApiList.bind(this);
        this.onTextBoxChange = this.onTextBoxChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.getApiList();
    }

    /* getBadgeColor(sonuc){

      if(sonuc.trim()=='Pass'){
          return("badge badge-success")
      } else if(sonuc.trim()=='Warning'){
        return("badge badge-warning")
      }
      else {
          return("badge badge-danger");
      }

    } */


    // toggleLoader = () => {
    //     if(!this.state.loading){
    //       this.setState({loading: true})
    //     }else{
    //       this.setState({loading: false})
    //     }
    //  }


    // refreshList(){
    //     fetch(variables.API_URL+'Performance')
    //     .then(response=>response.json()).then(
    //       data=> {
    //           this.setState({performance:data});
    //       }).catch(err=> console.log("error: ", err));


    // }

    // componentDidMount(){
    //     this.refreshList();
    //   }
   
    getApiList() {
        fetch('api/Home/GetAllRunResults').then(response => response.json())
            .then(
                data => {
                    if (data) {
                        this.setState({
                            ...this.state,
                            loading:false,
                            regression: data,
                            filteredData: data
                        });
                    }
                });
    }

    onTextBoxChange(evt) {

        var textdata = evt.target.value;
        var filteredData = {};
        if (textdata == '')
            filteredData = this.state.regression;
        else
            filteredData = this.state.regression.filter(item =>
                item.suiteAdi.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
                || item.modulAdi.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
                || item.sorumluIsim.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
                || item.suiteSonucu.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
            );

        this.setState({ ...this.state, searchText: textdata, filteredData: filteredData });

    }

    filterItems(arr, query) {
        return arr.filter(function (el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    render() {
        var _this = this;
        let runModalClose=()=>this.setState({runModalShow:false});
        // const{
        //     performance
        // }=this.state;
        return (
            <div>
            {/* <Testyonetimi/> */}
            <LoadingOverlay
        active={this.state.loading}
        spinner
        text='Bilgiler alınıyor lütfen bekleyiniz...'>
                <Container style={{ marginTop: 20, maxWidth: '100%' }}>
                        <Row>
                            <Col md={2} style={{ width:10}}>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" onChange={_this.onTextBoxChange} className="mr-sm-2" />
                                </Form>
                            </Col>
                            <Col style={{ marginRight:50}}>
                            </Col>
                            {" "}
                            <Col style={{ float: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="info" type="submit" onClick={() => {
                                var url = "/ModulDetay"
                                _this.props.history.push(url);
                                }} /* style={{ float: 'right' }} */>
                                    Modül İşlemleri
                        </Button></Col>

                        </Row>
            <Row style={{marginTop:10}}>
              <Col lg="12">
                            <Table className="table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Run ID</th>
                                        <th>RunCode</th>
                                        <th>Trigger Type</th>
                                        <th>Start Date</th>
                                        {/* <th>Kosulan Adet</th>
                                        <th>Pass</th>
                                        <th>Fail</th>
                                        <th>Warning</th>
                                        <th>Baslangıç Tarihi</th>
                                        <th>Süre</th>
                                        <th>Rapor</th> */}
                                        {/* <th style={{ display:"true" }}>Sorumlu</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredData?.map(item=> {

                                        return (
                                            <tr>
                                                <td style={{ wordBreak: 'break-all' }}>{item.testRunId}</td>
                                                <td style={{ wordBreak: 'break-all' }}>{item.runCode}</td>
{/*                                                 <td style={{ wordBreak: 'break-all' }}><span class={this.getBadgeColor(item.suiteSonucu)}>{item.suiteSonucu}</span></td> */}
                                                <td style={{ wordBreak: 'break-all' }}>{item.triggerType}</td>
                                                <td style={{ wordBreak: 'break-all' }}>{item.startedTime}</td>
                                                {/* <td style={{ wordBreak: 'break-all' }}><span class="badge badge-success text-uppercase">{item.pass}</span></td>
                                                <td style={{ wordBreak: 'break-all' }}><span class="badge badge-danger text-uppercase">{item.fail}</span></td>
                                                <td style={{ wordBreak: 'break-all' }}><span class="badge badge-warning text-uppercase">{item.warning}</span></td>
                                                <td style={{ wordBreak: 'break-all' }}>{item.baslangicTarihi}</td>
                                                <td style={{ wordBreak: 'break-all' }}>{item.sure}</td> */}
                                                <td style={{ wordBreak: 'break-all' }} class="text-center">
                                                    <Button variant='info' size='sm' onClick={event =>  
                                                    {var url="https://robotest/report/resultdetails/";
                                                    var w = window.open(url+item.raporAdi, '_blank');
                                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                              </svg> Rapor Detay</Button>   
                                                    </td>
                                                    <td style={{ wordBreak: 'break-all', display:"true" }}>Sorumlu Adı</td>
                                                    {/* <td class="text-center"><Button variant='success' size='sm'
                                                    onClick={ event=>{_this.toggleLoader()}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-caret-right-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
</svg> 
{this.state.isLoading ? (<Spinner style={{marginBottom:0}} animation="border"  size='sm' variant="dark" />) : "Çalıştır"}</Button></td> */}
                                            </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </Table>
                            </Col>
            </Row>
          </Container>
          </LoadingOverlay>
            </div>
        );
    }
}

export default TestSonuclari;
