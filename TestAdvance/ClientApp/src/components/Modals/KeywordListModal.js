import React, { Component,useState } from 'react';
import { Modal, ModalBody,Container, InputGroup, Card, Row, Col, Table, FormControl, Form, Button} from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay';
import { BasePage } from '../base/basepage';
import 'bootstrap/dist/css/bootstrap.css';
import { textSpanIntersectsWithPosition } from 'typescript';



 class KeywordListModal extends BasePage {


    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
            ...this.state,
            keywordList: [],
            loadingKeywordList:true

        }

        this.getKeywordList = this.getKeywordList.bind(this);
        this.onTextBoxChange = this.onTextBoxChange.bind(this);
        this.getKeywordList(this.props?.lastKeyword?.typeClass);

    }; 


      callback = (count) => {
       console.log(count);
    }

 async getKeywordList(typeClass) {
     debugger
  this.setState({loadingDeploymentList:true});
  this.GetSecureBase('api/Senaryo/GetAvaliableKeywords?HomeClass='+typeClass,this.state?.userInfo?.token)
  .then(data => {
  if (data) {
    this.setState({
      ...this.state,
      keywordList: data,
      filteredData: data,
      loadingKeywordList: false
    });
  } else {
    alert("Keyword listesi oluşturmada hata alındı. Hata kodu : " + data);
  }
});
  }

  KeywordSelect(lang){

    this.setState({ runKeywordModalShow:false,lastKeyword:lang},this.getDeploymentBuildInfo);


    
  };

  handleLangChange(item){
        var lang=item;
        this.props.handleKeywordSelect(item);            
}

    overlayDiv(){
        return <div style={{height:100}}></div>
      }

      onTextBoxChange(evt) {

        var textdata = evt.target.value;
        var filteredData = {};
        if (textdata === '') {
            filteredData = this.state.keywordList;
        }
        else {
            filteredData = this.state.keywordList.filter(item =>
                 item.name.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
                || item.type.toLowerCase().indexOf(textdata.toLowerCase()) !== -1
            );
            }

        this.setState({ ...this.state, searchText: textdata, filteredData: filteredData });

    }


    render() {
       var _this=this;

        return(
<Modal
                    {...this.props}
                    aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="custom-map-modal"
                    onAfterOpen={()=>this.getKeywordList(this.props.lastKeyword.typeClass)}
                    size="lg"
                    centered>

                    <Modal.Header clooseButton>
                    <div class="container-fluid"><Row><Col sm={11}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Keyword Listele & Seç
                        </Modal.Title>
                        </Col>
                        <Col sm={1} style={{marginLeft:'auto',marginRight:10}}><Button variant="danger" onClick={this.props.onHide}>Kapat</Button></Col>
                        </Row></div>
                    </Modal.Header>

                    <ModalBody>
                    <div className="body flex-grow-1 px-3">
  <div>
  <LoadingOverlay
                    active={this.state.loadingKeywordList}
                    spinner
                    text='Azure Devops üzerinden build bilgileri alınıyor lütfen bekleyiniz...'
                    style={{height:300}}> {this.state.loadingKeywordList==true ? <this.overlayDiv/> : ''}
     <Container fluid>
<Row>
    <Col sm={2}>
    <Form inline>
     <FormControl type="text" placeholder="Search" onChange={_this.onTextBoxChange} className="mr-sm-2" />
</Form>
    </Col>
    <div class="col-auto" style={{width:50}}>   </div>

</Row>
<br/>
          <Row>
            <Col sm={12}>

              <Table><tbody>

                                  <tr>
                                      <th>Build Id</th>
                                      <th>Build Number</th>
                                      <th>Pipeline Name</th>
                                      <th>User</th>
                                      <th></th>
                                  </tr>                                                            
              {this.state.filteredData?.map((item) => {
                 return (
                 <tr><td>{item.id}</td>
                 <td>{item.name}</td>
                 <td>{item.homeClass}</td>
                 <td>{item.typeClass}</td>
                 <td style={{ width: 100}}><Button variant='primary' size='sm' onClick={() => {this.handleLangChange(item)
                  this.getKeywordList(item.typeClass)
                }}>Seç</Button></td>
                 </tr>
                  )
                })
                  }</tbody>
              </Table></Col>
          </Row>
          </Container></LoadingOverlay>
  
  
  
  
  </div>
  </div>
            </ModalBody>

            </Modal>


        );
    };
}
    export default KeywordListModal;