import { FindPayStubByIdController } from "./FindPayStubByIdController";
import { PrismaPayStubRepository } from "../../core/reposity/PrismaPayStubRepository";
import { FindPayStubByIdUseCase } from "./FindPayStubByIdUseCase";

const payStubRepository = new PrismaPayStubRepository();
const findPayStubByIdUseCase = new FindPayStubByIdUseCase(payStubRepository);

const findPayStubByIdController = new FindPayStubByIdController(
  findPayStubByIdUseCase
);

export { findPayStubByIdController };
