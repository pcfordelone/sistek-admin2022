import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { CreateAdminUserController } from "./CreateAdminUserController";
import { CreateAdminUserUseCase } from "./CreateAdminUserUseCase";

const userRepository = new PrismaUserRepository();
const createAdminUserUseCase = new CreateAdminUserUseCase(userRepository);

const createAdminUserController = new CreateAdminUserController(
  createAdminUserUseCase
);

export { createAdminUserController };
