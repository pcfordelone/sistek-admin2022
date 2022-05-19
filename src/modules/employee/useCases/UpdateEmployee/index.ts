import { UpdateEmployeeController } from "./UpdateEmployeeController";
import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";
import { UpdateUserUseCase } from "../../../user/useCases/UpdateUser/UpdateUserUseCase";
import { PrismaUserRepository } from "../../../user/core/repository/PrismaUserRepository";

const employeeRepository = new PrismaEmployeeRepository();
const userRepository = new PrismaUserRepository();

const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateEmployeeUseCase = new UpdateEmployeeUseCase(
  employeeRepository,
  updateUserUseCase
);

const updateEmployeeController = new UpdateEmployeeController(
  updateEmployeeUseCase
);

export { updateEmployeeController };
