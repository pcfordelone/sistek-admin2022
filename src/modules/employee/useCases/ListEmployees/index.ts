import { ListEmployeesController } from "./ListEmployeesController";
import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { ListEmployeesUseCase } from "./ListEmployeesUseCase";

const employeeRepository = new PrismaEmployeeRepository();
const listEmployeesUseCase = new ListEmployeesUseCase(employeeRepository);

const listEmployeesController = new ListEmployeesController(
  listEmployeesUseCase
);

export { listEmployeesController };
