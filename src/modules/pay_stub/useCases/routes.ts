import { Router } from "express";
import multer, { Multer } from "multer";
import { upload } from "@config/multer";
import { container } from "tsyringe";
import {
  CreatePayStubController,
  UpdatePayStubController,
  DeletePayStubController,
  FindPayStubByIdController,
  ListPayStubsController,
} from "@pay_stub/useCases";

const payStubRoutes = Router();
const uploadPayStub: Multer = multer(upload("pay_stubs"));

const createPayStubController = container.resolve(CreatePayStubController);
const updatePayStubController = container.resolve(UpdatePayStubController);
const deletePayStubController = container.resolve(DeletePayStubController);
const findPayStubByIdController = container.resolve(FindPayStubByIdController);
const listPayStubsController = container.resolve(ListPayStubsController);

payStubRoutes.delete("/:id", deletePayStubController.handle);
payStubRoutes.get("/:id", findPayStubByIdController.handle);
payStubRoutes.get("/", listPayStubsController.handle);

payStubRoutes.post(
  "/",
  uploadPayStub.single("file"),
  createPayStubController.handle
);

payStubRoutes.put(
  "/:id",
  uploadPayStub.single("file"),
  updatePayStubController.handle
);

export { payStubRoutes };
