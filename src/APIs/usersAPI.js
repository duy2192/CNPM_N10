import{
    SERVER_NAME,
    SERVER_PORT,
    // APIResponse
} from './apiParameters'
const API_LOGIN= `${SERVER_NAME}:${SERVER_PORT}/users/login`;

export const userLogin = async (email,password) => { 
 try {
     let response= await fetch(API_LOGIN,{
         method: 'POST',
         body: `email=${email}&password=${password}`,
         headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        }, 
     })
     let responseJson=await response.json()
     if(responseJson.result==='ok'){
         return responseJson.data
     }
     else{
        return {}
     }
 } catch (error) {
    return {}
 }
}