import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { ChangeUserRoleUseCase } from "./ChangeUserRoleUseCase";
import { ChangeUserRoleController } from "./ChangeUserRoleController";

const userRepository = new PrismaUserRepository();
const changeUserRoleUseCase = new ChangeUserRoleUseCase(userRepository);

const changeUserRoleController = new ChangeUserRoleController(
  changeUserRoleUseCase
);

export { changeUserRoleController };
