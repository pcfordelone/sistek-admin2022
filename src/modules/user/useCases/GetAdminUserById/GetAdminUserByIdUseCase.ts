import { User } from "@prisma/client";
import { IUser } from "../../core/domain/IUser";
import { IUserRepository } from "../../core/repository/IUserRepository";

export class GetAdminUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const result: Omit<IUser, "password"> =
      await this.userRepository.findUserById(id);

    if (!result) {
      throw new Error("Invalid User");
    }

    return result;
  }
}
