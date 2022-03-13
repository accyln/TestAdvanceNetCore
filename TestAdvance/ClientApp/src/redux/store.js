import  reducerCombined  from './reducers';
import { createStore } from 'redux';


var storeObject =null;

if(global.mockStore){
     storeObject = global.mockStore;
}else{
     storeObject = createStore(reducerCombined);
}

 
export var store =  storeObject;