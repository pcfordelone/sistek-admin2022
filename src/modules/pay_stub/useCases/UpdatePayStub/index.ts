import { UpdatePayStubController } from "./UpdatePayStubController";
import { PrismaPayStubRepository } from "../../core/reposity/PrismaPayStubRepository";
import { UpdatePayStubUseCase } from "./UpdatePayStubUseCase";
import { PrismaEmployeeRepository } from "../../../employee/core/repository/PrismaEmployeeRepository";

const payStubRepository = new PrismaPayStubRepository();
const employeeRepository = new PrismaEmployeeRepository();

const updatePayStubUseCase = new UpdatePayStubUseCase(
  payStubRepository,
  employeeRepository
);

const updatePayStubController = new UpdatePayStubController(
  updatePayStubUseCase
);

export { updatePayStubController };
