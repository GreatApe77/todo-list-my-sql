import { UserController } from "./controllers/UserController";
import { UserRepository } from "./repositories/implementations/UserRepository";
import { LoginService } from "./services/implementations/LoginService";

const usersRepo = new UserRepository()
const loginService = new LoginService(usersRepo)
const usersController = new UserController(usersRepo,loginService)


export {
    usersRepo,
    usersController
}