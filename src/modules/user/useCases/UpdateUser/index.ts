import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { UpdateAdminUserUseCase } from "./UpdateAdminUserUseCase";
import { UpdateAdminUserController } from "./UpdateAdminUserController";

const userRepository = new PrismaUserRepository();
const updateAdminUserUseCase = new UpdateAdminUserUseCase(userRepository);

const updateAdminUserController = new UpdateAdminUserController(
  updateAdminUserUseCase
);

export { updateAdminUserController };
