export class HttpExcpetion extends Error{
    
    statusCode:number
    constructor(message?:string,statusCode=500){
        super(message)
        this.statusCode=statusCode    
    }
}