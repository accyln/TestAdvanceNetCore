import * as actionTypes from "../redux/actions/actionTypes"

export const initialState =
{
    isAuth: [{test:"Acc"}]
};

const reducer = (state,action) => {

    switch(action.type) {
        case actionTypes.AUTH:
          return {...state};  
       default: 
        return {...state};
      }
    }

    export default reducer;
