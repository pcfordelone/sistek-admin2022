import { UserEntity } from "../../core/domain/User";
import { IUserRepository } from "../../core/repository/IUserRepository";

export class ChangeStatusAdminUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findUserByIdWithPassword(id);

    if (!user) {
      throw new Error("User invalid!");
    }

    user.isActive = !user.isActive;

    const user_entity = new UserEntity(
      {
        name: user.name,
        email: user.email,
        role: "ADMIN",
        password: user.password,
        isActive: user.isActive,
      },
      user.id
    );

    const result = this.userRepository.updateUser(id, user_entity);

    return result;
  }
}
