import * as actionTypes from "./actionTypes"
import {PostSecure} from '../../components/base/Server';

export function getAuth(authToken) {
    return {type:actionTypes.AUTH, payload:authToken}
}

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
