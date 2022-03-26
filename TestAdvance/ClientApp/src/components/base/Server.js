import {getApiUrl} from './settings';

export function PostSecure(action,body,token)
{
    var header = {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : '',
     };

     if(!token)
     {
        header = {
            'Content-Type': 'application/json',
         };
     }
     
   return fetch(getApiUrl() + action, {
    method: 'POST',
    headers: header,
    body:JSON.stringify(body),
});
}


export async function GetSecure(action,token) {
    try{
      var header = {
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : '',
     };

     if(!token)
     {
        header = {
            'Content-Type': 'application/json',
         };
     }
     debugger;
      return await fetch(getApiUrl() + action);
    }
    catch(err) {
      throw err;
    }
  }

