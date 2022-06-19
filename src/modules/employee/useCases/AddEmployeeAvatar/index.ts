import { PrismaEmployeeRepository } from "../../core/repository/PrismaEmployeeRepository";
import { AddEmployeeAvatarUseCase } from "./AddEmployeeAvatarUseCase";
import { AddEmployeeAvatarController } from "./AddEmployeeAvatarController";

const employeeRepository = new PrismaEmployeeRepository();

const addEmployeeAvatarUseCase = new AddEmployeeAvatarUseCase(
  employeeRepository
);

const addEmployeeAvatarController = new AddEmployeeAvatarController(
  addEmployeeAvatarUseCase
);

export { addEmployeeAvatarController };
