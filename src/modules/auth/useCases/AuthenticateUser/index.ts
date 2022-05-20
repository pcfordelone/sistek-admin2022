import { IUserRepository } from "../../../user/core/repository/IUserRepository";
import { PrismaUserRepository } from "../../../user/core/repository/PrismaUserRepository";
import { IAuthenticateProvider } from "../../providers/IAuthenticateProvider";
import { JWTAuthenticateProvider } from "../../providers/JWTAuthenticateProvider";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserController } from "./AuthenticateUserController";

const userRepository: IUserRepository = new PrismaUserRepository();
const authenticateProvider: IAuthenticateProvider =
  new JWTAuthenticateProvider();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepository,
  authenticateProvider
);

const authenticateController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateController };
