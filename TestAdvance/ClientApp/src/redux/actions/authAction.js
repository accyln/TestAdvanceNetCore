import * as actionTypes from "./actionTypes"
import {PostSecure} from '../../components/base/Server';
import { getApiUrl } from '../../components/base/settings';
import {store} from '../store'

/* export function getAuth(authToken) {
    debugger;
    window.localStorage.setItem('JWT2',JSON.stringify(authToken));
    return {type:actionTypes.AUTH, payload:authToken}
} */

export function login(userName,passWord){
    return function(dispatch) {
        let data={
            userName:userName,
            passWord:passWord
        }
        let url="/api/Auth/SignIn";
        return PostSecure('api/Auth/SignIn',data,undefined).then(result=> dispatch(getAuth(result)));
    };
}


export function getAuth(userInfo) {
    window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
    return {type:actionTypes.LOGIN, payload:userInfo}
}

/* export function singIn(user,pass){
    let body={
        "userName": user,
        "password": pass
    }
        return (PostSecure('api/Auth/SignIn',body,undefined).then(response => {if(response && response.ok) return response.json()})
                .then(result=>{
                    if(result) {
                        store.dispatch(getAuth(result))
                    
                    }
                    else {
                        alert("Kullanıcı adı veya şifre hatalı")
                    }
                }
                ));
} */

export function singIn(result){
    
    store.dispatch(getAuth(result));
    setAuthStatus(true);               
                  
}


export function setUserInfo(userInfo) {
    return {type:'SetUserInfo', payload:userInfo}
}

export function storeUserInfo(userInfo) {
    return store.dispatch(setUserInfo(userInfo));
}

export function setAuthStatus(isAuth)
{  
   return store.dispatch({
        type: actionTypes.CHECKAUTH,
        payload: isAuth

    });
};
