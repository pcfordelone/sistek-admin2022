import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";
import { DeleteEmployeeController } from "./DeleteEmployeeController";

const employeeRepository = new PrismaEmployeeRepository();
const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository);

const deleteEmployeeController = new DeleteEmployeeController(
  deleteEmployeeUseCase
);

export { deleteEmployeeController };
