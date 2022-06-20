import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@user/core";
import { IUser } from "@user/core";

@injectable()
export class ChangeUserRoleUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findUserByIdWithPassword(id);

    if (!user) {
      throw new Error("User invalid!");
    }

    const newUser: IUser = {
      ...user,
      role: user.role === "USER" ? "ADMIN" : "USER",
    };

    const result = this.userRepository.updateUser(id, newUser);

    return result;
  }
}
