import {Request, Response, Router} from "express"
import { usersController } from "./setup"
import { RequestValidator } from "./middlewares/RequestValidator"

const router = Router()

router.post("/users",RequestValidator.validateCreateUserRequest,(req:Request,res:Response)=>{
    return usersController.registerUser(req,res)
})
router.post("/login",RequestValidator.validateLoginUserRequest,(req:Request,res:Response)=>{
    return usersController.loginAsUser(req,res)
})
export {
    router
}
