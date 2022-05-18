import * as actionTypes from "../actions/actionTypes";


var initialState =
{
    isAuth:false
};

export default function authStatusReducer(state=initialState,action) {

switch (action.type) {
    case actionTypes.CHECKAUTH:
        var isAuth = action.payload;
      return Object.assign({}, state, { isAuth: isAuth});
        default:
          return state;
}    
}