import React, { Component } from "react";
import {  Button } from 'react-bootstrap'
import { bindActionCreators } from "redux";
import  * as authAction from "../redux/actions/authAction";
import { connect } from "react-redux";

class Test extends Component{
 
    /* componentDidMount(){
       this.props.actions.getAuthToken()
    } */
    render(){
        return(
            <div>
           <Button onClick={()=>this.props.actions.getAuthToken()}>Call Auth Api</Button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:{
        getAuthToken:bindActionCreators(authAction.getAuthToken,dispatch)
    }
}
} 

export default connect(null,mapDispatchToProps)(Test)