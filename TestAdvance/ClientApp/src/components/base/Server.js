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
          'Accept': 'application/json'
         };
     }
   return fetch(getApiUrl() + action, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(body)
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
            'Accept': 'application/json'
         };
     }
      return await fetch(getApiUrl() + action, {
        method: 'GET',
        headers: header
    });
    }
    catch(err) {
      throw err;
    }
  }

