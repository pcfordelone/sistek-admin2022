import { DeletePayStubController } from "./DeletePayStubController";
import { DeletePayStubUseCase } from "./DeletePayStubUseCase";
import { PrismaPayStubRepository } from "../../core/reposity/PrismaPayStubRepository";

const payStubRepository = new PrismaPayStubRepository();
const deletePayStubUseCase = new DeletePayStubUseCase(payStubRepository);

const deletePayStubController = new DeletePayStubController(
  deletePayStubUseCase
);

export { deletePayStubController };
