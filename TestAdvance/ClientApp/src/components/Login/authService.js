import React, { useHistory }  from 'react';
import { Redirect, Route} from "react-router-dom";
import {getAuth} from '../../redux/actions/authAction';

    /* export function login() {
        return PostSecure('api/Auth/UserInfo',{},undefined).then(response => { if(response && response.ok) return response.json() 
            else alert("İşleminizi gerçekleştiremiyoruz lütfen daha sonra tekrar deneyiniz.")}).catch(
                (reason) => {
                    
                    alert(reason);
                })
                .then(
                    data => {
                        if(data)
                        {
                        var userInfo = { Name: data.name, Token: data.token, UserId:data.userId };
                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                        //stateAction(userInfo);

                        }
                    });
      } */
      

  export function logout() {
    localStorage.removeItem("userInfo")
  }

  export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('userInfo'));
      }

export function checkAuth(setAuthStatus,storeUserInfo){

    const userInfo = getCurrentUser();
   debugger;
    if(userInfo){
    const decodedJwt = JSON.parse(atob(userInfo.token.split('.')[1]));;

    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log("Token süresi dolmuş")
      setAuthStatus(false);

    } else {
        storeUserInfo(userInfo);
        getAuth(userInfo);
        setAuthStatus(true);
    }
  } else {
  console.log("Localden user bilgisi alınamadı.")
   setAuthStatus(false);
   debugger;
 
   return(<Redirect to='/'></Redirect>)
  }
  } 

  export function getAuthStatus(){
      debugger;
      return this.state.isAuth;
  }
