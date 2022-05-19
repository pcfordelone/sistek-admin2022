import { FindEmployeeByEmailController } from "./FindEmployeeByEmailController";
import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { FindEmployeeByEmailUseCase } from "./FindEmployeeByEmailUseCase";

const employeeRepository = new PrismaEmployeeRepository();
const findEmployeeByEmailUseCase = new FindEmployeeByEmailUseCase(
  employeeRepository
);

const findEmployeeByEmailController = new FindEmployeeByEmailController(
  findEmployeeByEmailUseCase
);

export { findEmployeeByEmailController };
