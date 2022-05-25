import React, { useState ,useEffect} from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap'
import {useHistory } from 'react-router';
import LoadingOverlay from 'react-loading-overlay';
import {singIn} from '../../redux/actions/authAction';
import {PostSecure} from '../../components/base/Server';
import { useAdvanceLayerValue } from '../../context/advanceContext';


export function Login(){

const [userName,setUserName]=useState("");
const [password,setpassword]=useState("");
const [loading,setloading]=useState(false);

const history=useHistory();
const [{isAuth},dispatch] =useAdvanceLayerValue();

useEffect(() => {
console.log(isAuth)

  },[isAuth]) 


function userNameChange (e){ setUserName(e.target.value)}
function passwordChange (e){ setpassword(e.target.value)}


function clickLogin(){
     setloading(true);
     trysingIn(userName,password);


}

function trysingIn(user,pass){
    let body={
        "userName": user,
        "password": pass
    }
        return (PostSecure('api/Auth/SignIn',body,undefined).then(response => {if(response && response.ok) return response.json()})
                .then(result=>{
                    if(result) {
                        singIn(result);
                        history.push('/Home');
                    }
                    else {
                        alert("Kullanıcı adı veya şifre hatalı")
                    }
                    setloading(false);
                }
                ));
}

return(
    <LoadingOverlay
    active={loading}
    spinner
    text="Release detay bilgileri alınıyor..."
    style={{ height: 100 }}
  >
    <div>
        <Row>
            <div style={{height:150}}></div>
        </Row>
        <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
            <div>
              <center><span class="white" style={{ marginLeft:30,marginTop:20,
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",color:"#adadad"
          }}><h4>SAKARYA ÜNİVERSİTESİ</h4>
          <h4>BİLGİ TEKNOLOJİLERİ BÖLÜMÜ</h4>
          <h4>YÜKSEK LİSANS PROJESİ</h4>
          <h4>TEST OTOMASYON YÖNETİMİ UYGULAMASI</h4></span></center></div>
                <Card style={{border:"1px solid"}}>
                    <Card.Body>
                    
                    <Form>
                                    <Form.Group controlId="Release">
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={(e)=>userNameChange(e)} required
                                              value={userName}/>
                                        </div>
                                        <br></br>                 
                                        <Form.Label>Şifre</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={(e)=>passwordChange(e)} required
                                              value={password}/>
                                        </div>
                                        <br></br>
                                        <div><Button onClick={clickLogin}>
                                            Giriş</Button></div>
                                        
                                        </Form.Group></Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}></Col>
        </Row>
    </div>
    </LoadingOverlay>
)


}