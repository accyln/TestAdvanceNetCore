import * as actionTypes from "./actionTypes"

export function getAuth(authToken) {
    return {type:actionTypes.AUTH, payload:authToken}
}

export function getAuthToken(){
    return function(dispatch) {
        let url="https://localhost:44328/api/Home/GetTestCase?id=1";
        return fetch(url).then(response=>response.json()).then(result=> dispatch(getAuth(result[0].id)));
    };
}
