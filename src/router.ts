import {Request, Response, Router} from "express"
import { usersController } from "./setup"

const router = Router()

router.post("/users",(req:Request,res:Response)=>{
    return usersController.registerUser(req,res)
})

export {
    router
}
