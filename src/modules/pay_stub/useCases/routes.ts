import { Request, Response, Router } from "express";
import { createPayStubController } from "./CreatePayStub";
import { deletePayStubController } from "./DeletePayStub";
import { findPayStubByIdController } from "./FindPayStubById";
import { listPayStubsController } from "./ListPayStubs";
import { updatePayStubController } from "./UpdatePayStub";

const payStubRoutes = Router();

payStubRoutes.post("/", (request: Request, response: Response) => {
  createPayStubController.handle(request, response);
});

payStubRoutes.put("/:id", (request: Request, response: Response) => {
  updatePayStubController.handle(request, response);
});

payStubRoutes.delete("/:id", (request: Request, response: Response) => {
  deletePayStubController.handle(request, response);
});

payStubRoutes.get("/:id", (request: Request, response: Response) => {
  findPayStubByIdController.handle(request, response);
});

payStubRoutes.get("/", (request: Request, response: Response) => {
  listPayStubsController.handle(request, response);
});

export { payStubRoutes };
