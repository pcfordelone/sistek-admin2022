import { CreatePayStubController } from "./CreatePayStubController";
import { PrismaPayStubRepository } from "../../core/reposity/PrismaPayStubRepository";
import { PrismaEmployeeRepository } from "../../../employee/core/repository/PrismaEmployeeRepository";
import { CreatePayStubUseCase } from "./CreatePayStubUseCase";

const payStubRepository = new PrismaPayStubRepository();
const employeeRepository = new PrismaEmployeeRepository();

const createPayStubUseCase = new CreatePayStubUseCase(
  payStubRepository,
  employeeRepository
);

const createPayStubController = new CreatePayStubController(
  createPayStubUseCase
);

export { createPayStubController };
