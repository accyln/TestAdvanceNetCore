import React from 'react';
import { store } from '../../redux/store'
import {GetSecure, PostSecure}  from './Server';

export class BasePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello World!</div>
        );
    }
    
   PostSecureBase(action,body,token)
   {
      return PostSecure(action,body,token).then(response => {
          
           if(response && response.ok)
           return response.json()
               else if(response)
               {
     response.json().then(json=>{
         
        if(json.errors)
        alert(json.errors.Subject)
        else
        alert("İşleminizi gerçekleştiremiyoruz lütfen daha sonra tekrar deneyiniz.")
     });         } 
     }
      )
      .catch(
        (reason) => {
            
            alert(reason);
        });
   }

   GetSecureBase(action,token)
   {
      return GetSecure(action,token).then(response => {
          debugger;
           if(response && response.ok)
           return response.json()
               else if(response)
               {
     response.json().then(json=>{
         
        if(json.errors)
        alert(json.errors.Subject)
        else
        alert("İşleminizi gerçekleştiremiyoruz lütfen daha sonra tekrar deneyiniz.")
     });         } 
     }
      )
      .catch(
        (reason) => {
            
            alert(reason);
        });
   }

    subscribeToStore(stores = []) {
        var state = store.getState();
        var storeobjects = {};
        for (var i = 0; i < stores.length; i++)
            storeobjects = Object.assign({}, storeobjects, { ...state[stores[i]] });

        //if (!equals(this.state, storeobjects))
            this.setState({ ...storeobjects });
    }

    setInitialState(stores) {
        var state = store.getState();
        var storeobjects = {};
        for (var i = 0; i < stores.length; i++)
            storeobjects = Object.assign({}, storeobjects, { ...state[stores[i]] });
        this.state = { ...storeobjects };
    }

    connect(stores = []) {
        this.storeSubscription = store.subscribe(this.subscribeToStore.bind(this, stores));
        this.setInitialState(stores);
    }

    componentWillUnmount() {
        if (this.storeSubscription)
            this.storeSubscription();
    }

    getAzureBuildStatus(item){
        return (<div>{item.status==='completed' ? (item.result === 'failed' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg> : item.result === 'succeeded' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg> : item.result==='partiallySucceeded' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>) : item.status==='inProgress' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-clock-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>}</div>)
    }
}