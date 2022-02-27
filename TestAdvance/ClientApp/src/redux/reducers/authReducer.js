import * as actionTypes from "../actions/actionTypes"

const authReducer = (state=0,action) => {
    let hasChanged = false
    let newState;
    let counter=0;

    switch(action.type) {
        case actionTypes.AUTH:
          return (newState=action.payload);  
       default: 
        return state;
      }


                
}
export default authReducer;