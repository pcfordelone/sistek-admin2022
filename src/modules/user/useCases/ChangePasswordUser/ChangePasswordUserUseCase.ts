import { IUserRepository } from "@user/core";
import { IUser } from "@user/core";
import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

@injectable()
export class ChangePasswordUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(
    id: string,
    { password, confirmPassword }: IChangePasswordRequest
  ) {
    const user: IUser = await this.userRepository.findUserByIdWithPassword(id);

    if (!user) {
      throw new Error("Invalid user.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }

    if (!confirmPassword) {
      throw new Error("Password confirmation is required.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords are differents");
    }

    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt);

    const newUser: IUser = {
      ...user,
      password,
    };

    const result: Omit<IUser, "password"> =
      await this.userRepository.updateUser(id, newUser);

    return result;
  }
}
