import { IUserRepository } from "../../core/repository/IUserRepository";
import { IUser } from "../../core/domain/IUser";
import { UserEntity } from "../../core/domain/User";
import { ICreateUserRequest } from "./CreateUserDTO";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequest) {
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
