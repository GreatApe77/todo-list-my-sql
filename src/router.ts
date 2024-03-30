import {Request, Response, Router} from "express"
import { checklistController, usersController } from "./setup"
import { RequestValidator } from "./middlewares/RequestValidator"
import { AuthUser } from "./middlewares/auth/AuthUser"

const router = Router()

router.post("/users",RequestValidator.validateCreateUserRequest,(req:Request,res:Response)=>{
    return usersController.registerUser(req,res)
})
router.post("/login",RequestValidator.validateLoginUserRequest,(req:Request,res:Response)=>{
    return usersController.loginAsUser(req,res)
})
router.get("/users/me",AuthUser.validateToken,(req:Request,res:Response)=>{
    return usersController.getUserById(req,res)
})
router.patch("/users/me",RequestValidator.validateUpdateUserFullName,AuthUser.validateToken,(req:Request,res:Response)=>{
    return usersController.updateFullName(req,res)
})
router.get("/users/:userId/checklists/:checklistId",AuthUser.validateToken,(req:Request,res:Response)=>{
    return checklistController.getById(req,res)
})
router.get("/users/:userId/checklists/",AuthUser.validateToken,(req:Request,res:Response)=>{
    return checklistController.getUsersChecklist(req,res)
})
export {
    router
}
