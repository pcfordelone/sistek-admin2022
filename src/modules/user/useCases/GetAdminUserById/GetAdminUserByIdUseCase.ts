import { inject, injectable } from "tsyringe";

import { IUser } from "@user/core";
import { IUserRepository } from "@user/core";

@injectable()
export class GetAdminUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const result: Omit<IUser, "password"> =
      await this.userRepository.findUserById(id);

    if (!result) {
      throw new Error("Invalid User");
    }

    return result;
  }
}
