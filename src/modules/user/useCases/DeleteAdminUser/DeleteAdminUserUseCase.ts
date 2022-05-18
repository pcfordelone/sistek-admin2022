import { IUser } from "../../core/domain/IUser";
import { IUserRepository } from "../../core/repository/IUserRepository";

export class DeleteAdminUserUseCase {
  constructor(private userRepository: IUserRepository) {}

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
