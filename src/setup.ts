import { UserController } from "./controllers/UserController";
import { UserRepository } from "./repositories/implementations/UserRepository";

const usersRepo = new UserRepository()
const usersController = new UserController(usersRepo)


export {
    usersRepo,
    usersController
}