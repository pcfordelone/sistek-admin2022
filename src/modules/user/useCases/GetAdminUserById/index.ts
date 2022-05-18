import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { GetAdminUserByIdUseCase } from "./GetAdminUserByIdUseCase";
import { GetAdminUserByIdController } from "./GetAdminUserByIdController";

const userRepository = new PrismaUserRepository();
const getAdminUserByIdUseCase = new GetAdminUserByIdUseCase(userRepository);

const getAdminUserByIdController = new GetAdminUserByIdController(
  getAdminUserByIdUseCase
);

export { getAdminUserByIdController };
