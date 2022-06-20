import { inject, injectable } from "tsyringe";

import { IUser } from "@user/core";
import { IUserRepository } from "@user/core";

@injectable()
export class DeleteAdminUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const user: Omit<IUser, "password"> =
      await this.userRepository.findUserById(id);

    if (!user) {
      throw new Error("Invalid User");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only admin user can be deleted");
    }

    const result = await this.userRepository.deleteUser(id);

    return result;
  }
}
