import React, { useState } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { BasePage } from './base/basepage'
import Select from 'react-select';
import {GetSecure, PostSecure}  from './base/Server';


class ModulDetay extends BasePage {


    constructor(props) {
        super(props);
        this.displayData = [];
        this.state = {
            ...this.state,
            apiList: [],
            showdata : this.displayData,
            modulInfo:[
                {id:0,
                modulAdi:"",
                email:"",
                sorumluPersonel:""
                }
            ],
            showInfoDiv:'none',
            isDisabled:true,
            guncelleMod:false,
            showSaveButton:'none',
            showAddButton:'none',
            id:'',
            modulAdi:"",
            emailGrubu:"",
            sorumlu:""

        };
    }

    componentDidMount() {
        this.getAllModules();
    }

    getAllModules(){
        fetch('api/Modul/GetAllModules').then(response=> response.json())
        .then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        apiList: data
                    });
                }
            });

    }


      onClick = () => {
        fetch('api/Modul/GetModul?id='+this.state.selectedOption.id,
            {}).then(response=> response.json())
            .then(
                data => {
                    if (data) {
                        this.setState({
                            ...this.state,
                            showInfoDiv:true,
                            isDisabled:true,
                            id:data[0]["id"],
                            modulAdi:data[0]["modulAdi"],
                            sorumlu:data[0]["sorumluPersonel"],
                            emailGrubu:data[0]["email"]

                            
                        });
                    }
                }); 
      }

    onClickNewRecord = () => {
        this.setState({
            showInfoDiv: true,
            isDisabled: false,
            guncelleMod:'none',
            showAddButton:true,
            id: '',
            modulAdi: '',
            modulDomainAdi: '',
            sorumlu: '',
            emailGrubu: ''
        });
    }

      handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Modül seçildi:`, selectedOption.modulAdi);

      };

      handleGuncelle = () => this.setState({ isDisabled: false,guncelleMod:'none',showSaveButton:false})

      onMailChange = (e) => this.setState({ emailGrubu: e.target.value })
      onModulAdiChange = (e) => this.setState({ modulAdi: e.target.value })
      onSorumluChange = (e) => this.setState({ sorumlu: e.target.value })

      onClickVazgec = () => {
        this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'}) ;
      }

      onClickKaydet = () => {
        let data={
            id:this.state.id,   
            modulAdi:this.state.modulAdi,
            email:this.state.emailGrubu,
            sorumluPersonel:this.state.sorumlu
            }
            this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
            console.log(data);
            this.updateModul(data); ;
      }

      onClickEkle = () => {
       let data={
        id:0,   
        modulAdi:this.state.modulAdi,
        email:this.state.emailGrubu,
        sorumluPersonel:this.state.sorumlu
        }
        this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
        console.log(data);
        this.insertorupdate(data);
      }

      /* insertorupdate=(data)=>{
        this.PostSecureBase('api/controller/RobotestSonuclar/InsertModul',data).then(
            data => {
                if (data===200) {
                    console.log("insert edildi")
                    alert("İşlem tamamlandı");
                    this.componentDidMount();
                }
            });
      } */

      insertorupdate=(data)=>{

         let header = {
            'Content-Type': 'application/json',
         };

        fetch('api/Modul/AddModul', {
            method: 'POST',
            headers: header,
            body:JSON.stringify(data),
        }).then(response=>response.json())
        .then(
            data => {
                if (data) {
                    console.log("insert edildi")
                    alert("İşlem tamamlandı");
                    this.componentDidMount();
                }
            });
      }

      updateModul=(data)=>{

        let header = {
           'Content-Type': 'application/json',
        };

       fetch('api/Modul/UpdateModul', {
           method: 'POST',
           headers: header,
           body:JSON.stringify(data),
       }).then(response=>response.status)
       .then(
           data => {
               if (data===204) {
                   console.log("Update edildi")
                   alert("İşlem tamamlandı");
                   this.componentDidMount();
                   this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
               }
           });
     }

     deleteModul=(data)=>{

        let header = {
           'Content-Type': 'application/json',
        };

       fetch('api/Modul/DeleteModul?modulId='+this.state.id, {
        method: 'POST',
       headers: header
    }).then(response=>response.status)
       .then(
           data => {
               if (data===204) {
                   alert("İşlem tamamlandı");
                   this.getAllModules();
                   this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none',selectedOption:[]});
               }
           });
     }


    render() {

        let modules = this.state.apiList;

        return (
            <div>
                <Card>
                <div className="policy" style={{ height: '100px' ,zIndex: 10000,overflow: "visible"}}>
                    <Container style={{ margin: 10, maxWidth: '100%' ,zIndex: 10000,overflow: "visible"}}>
                        <Row><Col sm={3}>
                            <div disabled={!this.state.isDisabled}>
                        <Form.Label>Modül Adı :</Form.Label>
                        <Select onChange={this.handleChange} options={modules} disabled={!this.state.isDisabled}
                            getOptionLabel={(modules) => modules['modulAdi']}
                            getOptionValue={(modules) => modules['modulAdi']} style={{ zIndex: 10000,overflow: "visible" }}>

                        </Select>
                    </div>
                    </Col>
                    <Col sm={3} style={{ marginTop: 30}}>
                    <Button variant="primary" type="submit" onClick={this.onClick} disabled={!this.state.isDisabled}/* style={{ float: 'right' }} */>
                                        Getir
                        </Button>{"  "}<Button variant="success" type="submit" onClick={this.onClickNewRecord} disabled={!this.state.isDisabled} /* style={{ float: 'right' }} */>
                                        Yeni Kayıt Ekle
                        </Button></Col>
                       
                    </Row>
                    </Container>
                </div></Card>
                <pre></pre>
                <div className="policy" style={{ display:this.state.showInfoDiv }}>
                
                  
                <Card>
                 <div>
                 <Container style={{ margin: 10}}>
                    <Row>
                    <Col sm={2}>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" name="id"  required
                                             disabled={true} value={this.state.id}/>
                    </Col>
                    <Col sm={3}>
                    <Form.Label>Modül Adı</Form.Label>
                    <Form.Control type="text" name="modulad" onChange={this.onModulAdiChange} required
                                             disabled={this.state.isDisabled} value={this.state.modulAdi}/>
                    </Col>
                    </Row>
                    <pre></pre>
                    <pre></pre>
                    <Row>
                    <Col sm={2}>
                    <Form.Label>Sorumlu</Form.Label>
                    <Form.Control type="text" name="sorumlu" onChange={this.onSorumluChange} required
                                             disabled={this.state.isDisabled} value={this.state.sorumlu}/>
                   
                    </Col>
                    <Col sm={3}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" onChange={this.onMailChange} required
                                             disabled={this.state.isDisabled} value={this.state.emailGrubu}/>
                    </Col>
                    </Row>
                    <pre></pre>
                    <pre></pre>
                    <pre></pre>
                    <Row style={{ display:this.state.guncelleMod}}> 
                    <Col sm={2}>
                    <Button variant="info" type="submit" onClick={this.handleGuncelle}/* style={{ float: 'right' }} */>
                                        Güncelle
                        </Button>
                        {" "}
                        <Button variant="danger" type="submit" onClick={this.deleteModul}/* style={{ float: 'right' }} */>
                                        Sil
                        </Button>
                    </Col>
                    </Row>
                    <Row style={{ display:this.state.showSaveButton}}> 
                    <Col sm={2}>
                    <Button variant="primary" type="submit" onClick={this.onClickKaydet}/* style={{ float: 'right' }} */>
                                        Kaydet
                        </Button>
                        {" "}
                        <Button variant="danger" type="submit" onClick={this.onClickVazgec}/* style={{ float: 'right' }} */>
                                        Vazgeç
                        </Button>
                    </Col>
                    </Row>

                    <Row style={{ display:this.state.showAddButton}}> 
                    <Col sm={2}>
                    <Button variant="primary" type="submit" onClick={this.onClickEkle}/* style={{ float: 'right' }} */>
                                        Ekle
                        </Button>
                        {" "}
                        <Button variant="danger" type="submit" onClick={this.onClickVazgec}/* style={{ float: 'right' }} */>
                                        Vazgeç
                        </Button>
                    </Col>
                    </Row>
                    </Container>


                    </div>
                 </Card>
                </div>
            </div>

        )


    }


} export default ModulDetay