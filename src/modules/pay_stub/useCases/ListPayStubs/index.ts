import { ListPayStubsController } from "./ListPayStubsController";
import { PrismaPayStubRepository } from "../../core/reposity/PrismaPayStubRepository";
import { PrismaEmployeeRepository } from "../../../employee/core/repository/PrismaEmployeeRepository";
import { ListPayStubsUseCase } from "./ListPayStubsUseCase";

const payStubRepository = new PrismaPayStubRepository();
const employeeRepository = new PrismaEmployeeRepository();

const listPayStubsUseCase = new ListPayStubsUseCase(
  payStubRepository,
  employeeRepository
);

const listPayStubsController = new ListPayStubsController(listPayStubsUseCase);

export { listPayStubsController };
