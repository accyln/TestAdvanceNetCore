import * as actionTypes from "../actions/actionTypes";


export default function authReducers(state={},action) {

switch (action.type) {
    case actionTypes.LOGIN:
        var userInfo = { name:action.payload.name, surName:action.payload.surName,token: action.payload.token};
        /* return (newState=action.payload.userId);  */
        return Object.assign({}, state, { userInfo: userInfo});
    case 'SetUserInfo':
        var userInfo = { name:action.payload.name, surName:action.payload.surName,token: action.payload.token};
        /* return (newState=action.payload.userId);  */
        return Object.assign({}, state, { userInfo: userInfo});
        default:
          return state;
}    
}