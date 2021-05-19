import{
    SERVER_NAME,
    SERVER_PORT,
    // APIResponse
} from './apiParameters'
const API_COVID19= `${SERVER_NAME}:${SERVER_PORT}/data/covid19`;
const API_COVID19_VN= `${SERVER_NAME}:${SERVER_PORT}/data/covid19vietnamdetails`;

export const getDataCovid19 = async () => { 
 try {
    let response= await fetch(API_COVID19)
    let responseJson=await response.json()   
    return responseJson
 } catch (error) {
    return {}
 }
}

export const getDataCovid19VN = async () => { 
   try {
      let response= await fetch(API_COVID19_VN)
      let responseJson=await response.json()   
      return responseJson
   } catch (error) {
      return {}
   }
  }