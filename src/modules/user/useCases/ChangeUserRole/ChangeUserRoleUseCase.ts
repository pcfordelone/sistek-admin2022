import { IUserRepository } from "../../core/repository/IUserRepository";
import { IUser } from "../../core/domain/IUser";

export class ChangeUserRoleUseCase {
  constructor(private userRepository: IUserRepository) {}

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
