import { IUserRepository } from "../../core/repository/IUserRepository";
import { IUser } from "../../core/domain/IUser";
import bcrypt from "bcrypt";

interface IChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

export class ChangePasswordUserUseCase {
  constructor(private userRepository: IUserRepository) {}

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
