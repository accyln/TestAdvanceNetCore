import React, { useState } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import Select from 'react-select';
import Tost from './Tost';


class TestSenaryolari extends React.Component {


    constructor(props) {
        super(props);
        this.displayData = [];
        this.state = {
            ...this.state,
            apiList: [],
            showdata : this.displayData,
        postVal : "",
        buttonstatus:false,
        buttonwhenclick:true,
        moduls: [],
        methods: [],
        senaryoDetay:[{
          testSenaryosu: "",
        }],
        senaryo:[],
        selectedOption: null,
        option : [
          {
            label: "startTest",
            value: "startTest",
          },
          {
            label: "login",
            value: "login",
          },
          {
            label: "islemSec",
            value: "islemSec",
          },
          {
            label: "musteriAra",
            value: "musteriAra",
          }
        ],
        parametre:[
          {
            case: "",
            param: [],
          }
        ]
        };
        this.appendData = this.appendData.bind(this);
        this.prependData = this.prependData.bind(this);
        this.getModulList=this.getModulList.bind(this);
    }

    componentDidMount() {
        this.getModulList();
    } 


    getModulList() {
        fetch('api/Home/GetAllModuls').then(response => response.json())
            .then(
                data => {
                    if (data) {
                        this.setState({
                            ...this.state,
                            loading:false,
                            moduls: data,
                        });
                    }
                });
    }


    onAdd = (product) => {
        const [cartItems, setCartItems] = useState([]);
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
          setCartItems(
            cartItems.map((x) =>
              x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
            )
          );
        } else {
          setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
      };

    appendData() {
        if(this.state.postVal!=""){
             this.displayData.push(<div  id="component" className="component" style={{maxWidth: '%100',display: 'flex',  justifyContent:'center', alignItems:'center'}}><Row><div><span class="badge badge-success">{this.state.postVal}</span></div></Row></div>);
             this.setState({
                showdata : this.displayData,
                postVal : ""
             });
        }
          }
    
      prependData() {
       this.displayData.unshift(<div id="display-data" style={{maxWidth: '%100',display: 'flex',  justifyContent:'center', alignItems:'center'}}><pre><div><Form.Label>startTest()</Form.Label></div></pre></div>);
       this.setState({
          showdata : this.displayData,
          postVal : ""
       });
     }

    changeKeyword = (keyword) => {

        this.setState({postVal:keyword.className,
        senaryo:[]});
        console.log(this.state.postVal +' '+keyword.className)
        this.onCaseSelected(keyword);
      
      }



      /* getScenario=()=>{
        const recipeName = document.getElementsByClassName("component")["innerText"];
        var rootElement = document.getElementById('component');
        console.log(recipeName);
      } */

      handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Modül seçildi:`, selectedOption);

      };

      /* onClick = () => {
        this.PostSecureBase('api/controller/RobotestSonuclar/TestSenaryolari?ModulAdi='+this.state.selectedOption.modulAdi,
            {})
            .then(
                data => {
                    if (data) {
                        this.setState({
                            ...this.state,
                            methods: data,
                            
                        });
                    }
                }); 
                console.log(`Modül seçildi:`, this.state.methods);
      } */


      onCaseSelected= async (keyword)=> {
        console.log("Modul: "+this.state.selectedOption["modulAdi"],"Case : "+keyword.className)
        /* await this.PostSecureBase('api/controller/RobotestSonuclar/TestSenaryolari?ModulAdi='+this.state.selectedOption["modulAdi"]+'&method='+keyword.className,
            {})
            .then(
                data => {
                    if (data) {
                        this.setState({
                            ...this.state,
                            senaryoDetay: data
                        });
                    }
                }); */
        console.log(`Testtttt:`, this.state.senaryoDetay[0].testSenaryosu, "postval: ", this.state.postVal, this.state.selectedOption["modulAdi"]);

        var size = Object.keys(this.state.senaryoDetay[0].testSenaryosu.split("(")).length;
        let allSenario = this.state.senaryoDetay[0].testSenaryosu
        for (let i = 1; i < size; i++) {
          let senary = allSenario.substring(0, allSenario.indexOf(")") + 1);
          let paramObj = [{
            label: senary,
            value: "testt",
          }];
          if (senary.includes(".")) {
            console.log("Parametre var " + senary)
            let paramPart=senary.substring(senary.indexOf("(")+1, senary.indexOf(")")).split(",");
            console.log("substring: "+paramPart);
            /* for(let j = 0; j < paramPart.length; j++){ */
              let u={
                case:senary,
                param:paramPart
              }
              this.setState({

                parametre: this.state.parametre.concat(u)
              })
           
              console.log("u :"+ u)
            console.log("Parametre state :"+this.state.parametre)
            /* for(let j = 1; j < (paramPart.match(/,/g) || []).length+2; j++){
            let param=senary.split(",");
            console.log()
            } */
            /* this.setState({

              parametre: this.state.parametre.concat(paramObj)
            }) */

          }

          allSenario = allSenario.substring(allSenario.indexOf(").") + 2);
          //console.log(allSenario);

          this.setState({
            senaryo: this.state.senaryo.concat(senary)
          })

        }
        //this.setState({senaryo:this.state.senaryoDetay[0].testSenaryosu.split(".")});
        console.log("Tüm senaryo: "+this.state.senaryo);
    }


    render() {

        let modules = this.state.moduls;

        return (
            <div>
              <Tost/>
                <div className="policy" style={{ border: "1px ridge", height: '100px' ,zIndex: 10000,overflow: "visible"}}>
                    <Container style={{ margin: 10, maxWidth: '100%' ,zIndex: 10000,overflow: "visible"}}><Row><Col sm={2}><div>
                        <Form.Label>Modül Adı :</Form.Label>
                        <Select onChange={this.handleChange} options={modules}
                            getOptionLabel={(modules) => modules['modulAdi']}
                            getOptionValue={(modules) => modules['modulAdi']} style={{ zIndex: 10000,overflow: "visible" }}>

                        </Select>
                    </div>
                    </Col>
                    <Col style={{ marginTop: 30}}>
                    <Button variant="primary" type="submit" onClick={this.onClick}/* style={{ float: 'right' }} */>
                                        Getir
                        </Button></Col>
                    </Row>
                    </Container>
                </div>
                {/* <div className="policy" style={{ borderWidth: "1px", borderStyle: "solid",maxWidth:"%100" }}> */}
                <Container style={{ margin: 10, maxWidth: '100%' }}>
                    <Row>
                    <Col sm={4}>
                    <div className="policy" style={{ border: "1px ridge",maxWidth:"%100" }}>
                    <Container style={{ margin: 10, padding: -20, maxWidth: '90%' }}>
                        <Row>
                            <Col>
                            <div style={{maxWidth:'%100',  justifyContent:'center', alignItems:'center'}}>
             <div className="panel panel-primary" id="result_panel">
    <div className="panel-heading"><Row><div style={{marginLeft:25}}><h6 class="panel-title">Test Caseler</h6></div><div style={{marginLeft:80,alignItems:'right'}}>
      {/* <Button variant='info' size="sm" className="button" onClick={this.appendData}>Ekle</Button> */}
      </div>
    </Row></div>
<div style={{marginTop:5}}>
       <ListGroup>
     {this.state.methods.map(keyword => (<ListGroupItem active={keyword.className===this.state.postVal? true : false} onClick={() => this.changeKeyword(keyword)} key={keyword.className}>{keyword.className}</ListGroupItem>))}
   </ListGroup> </div>
</div>  
             </div>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                    </Col>
                    <Col sm={8}>
                    <div className="policy" style={{ border: "none", maxWidth:"%100",maxHeight:"%100",height:'400px'}}>
{this.displayData}
{/* <ListGroup>
     {this.state.senaryo.map(keyword => (<ListGroupItem key={keyword}>{keyword}</ListGroupItem>))}
   </ListGroup> */}
   {this.state.senaryo.map(step => (<div class="shadow-sm p-3 mb-3 card">
  <div class="card-body">
    <h5 class="card-title">{step}</h5>
    <p class="card-text">Anka modül ekranına giriş sağlar.</p>
    <div style={{width:150}}>{step.substring(step.indexOf("(")+1, step.indexOf(")")).split(",").size>0 ? <Select  options={
      this.state.parametre.map((pr) => {
         return {
            label: pr,
            value: pr,
            key: pr
         }
      })
   }
                            //getOptionLabel={(parametre) => parametre["label"]}
                            //getOptionValue={(parametre) => parametre["value"]}
                            >

  </Select> : null }</div>
  </div>
  </div>))}
                    </div>

                    
                    </Col>
                    </Row>
                    </Container>
                {/* </div> */}
            </div>

        )


    }


} export default TestSenaryolari