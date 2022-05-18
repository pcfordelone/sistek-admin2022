import { User } from "@prisma/client";
import { IUserRepository } from "../../core/repository/IUserRepository";

export class GetAdminUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const result: Omit<User, "password"> =
      await this.userRepository.findUserById(id);

    if (!result) {
      throw new Error("Invalid User");
    }

    if (result.role !== "ADMIN") {
      throw new Error("Invalid User");
    }

    return result;
  }
}
