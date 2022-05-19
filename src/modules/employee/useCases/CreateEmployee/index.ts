import { PrismaUserRepository } from "./../../../user/core/repository/PrismaUserRepository";
import { CreateEmployeeController } from "./CreateEmployeeController";
import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";
import { CreateUserUseCase } from "../../../user/useCases/CreateUser/CreateUserUseCase";

const employeeRepository = new PrismaEmployeeRepository();
const userRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const createEmployeeUseCase = new CreateEmployeeUseCase(
  employeeRepository,
  createUserUseCase
);

const createEmployeeControleer = new CreateEmployeeController(
  createEmployeeUseCase
);

export { createEmployeeControleer };
