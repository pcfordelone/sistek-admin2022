import { ChangeStatusAdminUserController } from "./ChangeStatusAdminUserController";
import { ChangeStatusAdminUserUseCase } from "./ChangeStatusAdminUserUseCase";
import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";

const userRepository = new PrismaUserRepository();
const changeStatusAdminUserCase = new ChangeStatusAdminUserUseCase(
  userRepository
);

const changeStatusAdminUserController = new ChangeStatusAdminUserController(
  changeStatusAdminUserCase
);

export { changeStatusAdminUserController };
