import {PostSecure} from '../base/Server';
import {getAuthToken} from '../../redux/actions/authAction';


export function signIn(user,pass){
 

    let body={
        "userName": user,
        "password": pass
    }

  /*   try{
        let requestdata={
            userName:user,
            password:pass            
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(requestdata)
        }; 

            fetch('api/Auth/SignIn',requestOptions).then(response=> response.json())
            .then(
                data => {
                    if (data) {
                        setToken(data)
                        alert("Login başarılı.");

                        } else {
                            alert("Login işleminde hata alındı. Hata kodu : "+data);
                        }
                    
                });
    } catch (e) {
        alert("İşleminizi gerçekleştirilemedi, servis çağrısında hata alındı.");

        } */

   PostSecure('api/Auth/SignIn',body,undefined).then(response => { 
        debugger;
        if(response && response.ok)return response.json() 
        else alert("İşleminizi gerçekleştiremiyoruz lütfen daha sonra tekrar deneyiniz.")}).catch(
            (reason) => {
                
                alert(reason);
            })
            .then(
                data => {
                    if(data)
                    {
                        alert("Login başarılı.");
                    var userInfo = { Token: data };
                    //stateAction(userInfo);
                    //page.setState({ ...state, userInfo: userInfo });
                    //setToken(data)
                    }
                }); 

}


export function setToken(token)
{
    
 window.localStorage.setItem('jwt',token);


}