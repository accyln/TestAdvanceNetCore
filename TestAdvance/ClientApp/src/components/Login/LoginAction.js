import {PostSecure} from '../base/Server';


export function signIn(user,pass){
 
    let body={
        "userName": user,
        "password": pass
    }

    PostSecure('api/Auth/SignIn',body,undefined).then(response => { if(response && response.ok)return response.json() 
        else alert("İşleminizi gerçekleştiremiyoruz lütfen daha sonra tekrar deneyiniz.")}).catch(
            (reason) => {
                
                alert(reason);
            })
            .then(
                data => {
                    if(data)
                    {
                    var userInfo = { Token: data };
                    //stateAction(userInfo);
                    page.setState({ ...page.state, userInfo: userInfo });
                    setToken(data)
                    }
                });

}


export function setToken(token)
{
    
 window.localStorage.setItem('jwt',token);


}