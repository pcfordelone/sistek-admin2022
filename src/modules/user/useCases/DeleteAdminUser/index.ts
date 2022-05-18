import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { DeleteAdminUserUseCase } from "./DeleteAdminUserUseCase";
import { DeleteAdminUserController } from "./DeleteAdminUserController";

const userRepository = new PrismaUserRepository();
const deleteAdminUserUseCase = new DeleteAdminUserUseCase(userRepository);

const deleteAdminUserController = new DeleteAdminUserController(
  deleteAdminUserUseCase
);

export { deleteAdminUserController };
