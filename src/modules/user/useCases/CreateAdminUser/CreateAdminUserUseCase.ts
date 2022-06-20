import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@user/core";
import { IUser } from "@user/core";
import { UserEntity } from "@user/core";
import { ICreateAdminUserRequest } from "./CreateAdminUserDTO";

@injectable()
export class CreateAdminUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateAdminUserRequest) {
    const userAlreadyExists: IUser = await this.userRepository.findUserByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    if (!data.name || data.name.length < 3) {
      throw new Error("Name is required and must be longer than 3 characters!");
    }

    if (!data.email) {
      throw new Error("E-mail is required.");
    }

    if (data.role !== "ADMIN") {
      throw new Error("Only Admin users can be created here!");
    }

    if (!data.password) {
      throw new Error("Password is required.");
    }

    if (!data.confirm_password) {
      throw new Error("Password confirmation is required.");
    }

    if (data.password !== data.confirm_password) {
      throw new Error("Passwords are differents");
    }

    const salt = await bcrypt.genSalt(12);
    data.password = await bcrypt.hash(data.password, salt);
    delete data.confirm_password;

    const user: IUser = new UserEntity(data);

    const result: Omit<IUser, "password"> =
      await this.userRepository.createUser(user);

    return result;
  }
}
