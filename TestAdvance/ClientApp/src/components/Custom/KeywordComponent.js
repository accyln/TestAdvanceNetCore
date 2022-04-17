import React, { useState,useEffect } from 'react';
import { Container, Accordion, Card, Row, Col,Form,Button } from 'react-bootstrap'


export function KeywordComponent(props){
const [applicationType,setType]=useState(null);


/* useEffect(() => {
    // Browser API kullanılarak document title güncellenir

  }) */

  function getDeployments(){
    let size=props.deployments.length;
    

    }

return(

<div>
 <Card className="mb-4" style={{border: "1px solid #c9c9c9"}}>
    <Card.Body style={{backgroundColor:"gainsboro"}}><center>{props.senaryo.name}</center>
    
    </Card.Body>
    </Card>
  </div>

)


}