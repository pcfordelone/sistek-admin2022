import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AuthenticateUserRequest } from "./AuthenticateUserDTO";
import { IUserRepository } from "@user/core";
import { IAuthenticateProvider } from "@auth/providers";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("AuthenticateProvider")
    private authenticateProvider: IAuthenticateProvider
  ) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User or password invalid!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("User or password invalid!");
    }

    const token = await this.authenticateProvider.authenticate(user);

    return {
      token,
      role: user.role,
      username: user.name,
      user_id: user.id,
    };
  }
}
