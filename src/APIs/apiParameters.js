export const SERVER_NAME= 'http://localhost'
export const SERVER_PORT= '3000'
export class APIResponse{
    constructor (data,message,result){
        this.data=data ? data:{}
        this.message=message ? message:""
        this.result=result
    }
}