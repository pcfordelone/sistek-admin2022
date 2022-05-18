import { PrismaUserRepository } from "../../core/repository/PrismaUserRepository";
import { ListAdminUsersUseCase } from "./ListAdminUsersUseCase";
import { ListAdminUsersController } from "./ListUsersController";

const userRepository = new PrismaUserRepository();
const listAdminUsersUseCase = new ListAdminUsersUseCase(userRepository);

const listAdminUsersController = new ListAdminUsersController(
  listAdminUsersUseCase
);

export { listAdminUsersController };
