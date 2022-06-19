import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";
import { ChangePasswordUserController } from "./ChangePasswordUserController";

const userRepository = new PrismaUserRepository();
const changePasswordUserUseCase = new ChangePasswordUserUseCase(userRepository);

const changePasswordUserController = new ChangePasswordUserController(
  changePasswordUserUseCase
);

export { changePasswordUserController };
