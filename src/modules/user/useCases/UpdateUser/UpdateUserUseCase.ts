import { IUser } from "../../core/domain/IUser";
import { IUserRepository } from "../../core/repository/IUserRepository";
import { UpdateUserRequest } from "./UpdateUserDTO";
import { UserEntity } from "../../core/domain/User";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, { name, email }: UpdateUserRequest) {
    const oldUser: IUser = await this.userRepository.findUserByIdWithPassword(
      id
    );

    if (!oldUser) {
      throw new Error("Invalid user.");
    }

    if (oldUser.role !== "USER") {
      throw new Error(`Invalid user: ID ${oldUser.id} e role: ${oldUser.role}`);
    }

    if (name && name.length < 3) {
      throw new Error("Name is required and must be longer than 3 characters!");
    }

    if (email) {
      const verifyEmailUser: IUser = await this.userRepository.findUserByEmail(
        email
      );

      if (verifyEmailUser && oldUser.email !== verifyEmailUser.email) {
        throw new Error("E-mail is already registered.");
      }
    }

    const user_data = {
      ...oldUser,
      name: name ? name : oldUser.name,
      email: email ? email : oldUser.email,
    };

    const user = new UserEntity(user_data, id);

    const result: Omit<IUser, "password"> =
      await this.userRepository.updateUser(id, user);

    return result;
  }
}
