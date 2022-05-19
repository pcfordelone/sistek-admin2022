import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { ChangeStatusEmployeeUseCase } from "./ChangeStatusEmployeeUseCase";
import { ChangeStatusEmployeeController } from "./ChangeStatusEmployeeController";

const employeeRepository = new PrismaEmployeeRepository();
const changeStatusEmployeeUseCase = new ChangeStatusEmployeeUseCase(
  employeeRepository
);

const changeStatusEmployeeController = new ChangeStatusEmployeeController(
  changeStatusEmployeeUseCase
);

export { changeStatusEmployeeController };
