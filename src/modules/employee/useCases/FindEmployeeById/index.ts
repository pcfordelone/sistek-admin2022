import { FindEmployeeByEmailController } from "../FindEmployeeByEmail/FindEmployeeByEmailController";
import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { FindEmployeeByIdUseCase } from "./FindEmployeeByIdUseCase";
import { FindEmployeeByIdController } from "./FindEmployeeByIdController";

const employeeRepository = new PrismaEmployeeRepository();
const findEmployeeByIdUseCase = new FindEmployeeByIdUseCase(employeeRepository);

const findEmployeeByIdController = new FindEmployeeByIdController(
  findEmployeeByIdUseCase
);

export { findEmployeeByIdController };
