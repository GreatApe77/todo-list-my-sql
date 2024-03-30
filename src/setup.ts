import { ChecklistController } from "./controllers/ChecklistController";
import { UserController } from "./controllers/UserController";
import { ChecklistRepository } from "./repositories/implementations/ChecklistRepository";
import { UserRepository } from "./repositories/implementations/UserRepository";
import { LoginService } from "./services/implementations/LoginService";

const usersRepo = new UserRepository()
const loginService = new LoginService(usersRepo)
const usersController = new UserController(usersRepo,loginService)
const checklistRepository = new ChecklistRepository()
const checklistController = new ChecklistController(checklistRepository)

export {
    usersRepo,
    usersController,
    checklistController
}