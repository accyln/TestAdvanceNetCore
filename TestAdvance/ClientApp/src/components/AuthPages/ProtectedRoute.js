import React, { Component }  from 'react';
import { Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component:Component,isAuthenticated,...rest}) => {

    return (
<Route
{...rest}
render={props=> {
    debugger;
    if(isAuthenticated){
        return <Component {...props}/>    
    } else {
        return (<Redirect to="/Login"/> )
    }
}}
/>


)

}
  
  
  export default ProtectedRoute;
