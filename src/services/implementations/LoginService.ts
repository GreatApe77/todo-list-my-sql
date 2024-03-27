import { env } from "../../config/environment";
import { IUser } from "../../models/interfaces/IUser";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ILoginService, LogingUserData } from "../interfaces/ILoginService";
export type UserJWTPayload = Pick<IUser, "id">;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpException } from "../../errors/HttpException";
export class LoginService implements ILoginService {
  constructor(private readonly userRepo: IUserRepository) {}
  async login(loggingUser: LogingUserData): Promise<string> {
    const user = await this.userRepo.getByUsername(loggingUser.username);
    if (!user) throw new HttpException("User not found", 404);
    const passwordMatch = await bcrypt.compare(
      loggingUser.password,
      user.password
    );
    if (!passwordMatch) throw new HttpException("Wrong Password", 400);
    const token = this.generateJwt({ id: user.id });
    return token;
    //const passwordMatch = await bcrypt.compare()
  }
  private generateJwt(payload: UserJWTPayload) {
    return jwt.sign(payload, env.JWT_SECRET);
  }
}
