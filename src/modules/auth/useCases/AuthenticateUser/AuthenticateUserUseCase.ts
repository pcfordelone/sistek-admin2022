import { AuthenticateUserRequest } from "./AuthenticateUserDTO";
import { IUserRepository } from "../../../user/core/repository/IUserRepository";
import bcrypt from "bcrypt";
import { IAuthenticateProvider } from "../../providers/IAuthenticateProvider";
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authenticateProvider: IAuthenticateProvider
  ) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User invalid!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Wrong Password!");
    }

    const token = await this.authenticateProvider.authenticate(user);

    return { token };
  }
}
