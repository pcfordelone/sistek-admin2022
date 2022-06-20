import { inject, injectable } from "tsyringe";

import { IUser } from "@user/core";
import { IUserRepository } from "@user/core";
import { UserEntity } from "@user/core";
import { IUpdateAdminUserRequest } from "./UpdateUserDTO";

@injectable()
export class UpdateAdminUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, data: IUpdateAdminUserRequest) {
    const oldUser: IUser = await this.userRepository.findUserByIdWithPassword(
      id
    );

    if (!oldUser) {
      throw new Error("Invalid user.");
    }

    if (oldUser.role !== "ADMIN") {
      throw new Error("Invalid user.");
    }

    if (!data.name || data.name.length < 3) {
      throw new Error("Name is required and must be longer than 3 characters!");
    }

    if (data.email) {
      const verifyEmailUser: IUser = await this.userRepository.findUserByEmail(
        data.email
      );

      if (verifyEmailUser && oldUser.email !== verifyEmailUser.email) {
        throw new Error("E-mail is already registered.");
      }
    }

    const user_data = {
      ...oldUser,
      name: data.name ? data.name : oldUser.name,
      email: data.email ? data.email : oldUser.email,
    };

    const user = new UserEntity(user_data, id);

    const result: Omit<IUser, "password"> =
      await this.userRepository.updateUser(id, user);

    return result;
  }
}
