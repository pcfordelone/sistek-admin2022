import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import { Multer } from "multer";
import { upload } from "@config/multer";
import multer from "multer";

import { FindEmployeeByEmailController } from "@employee/useCases";
import { FindEmployeeByIdController } from "@employee/useCases";
import { ListEmployeesController } from "@employee/useCases";
import { CreateEmployeeController } from "@employee/useCases";
import { UpdateEmployeeController } from "@employee/useCases";
import { ChangeStatusEmployeeController } from "@employee/useCases";
import { AddEmployeeAvatarController } from "@employee/useCases";
import { DeleteEmployeeController } from "@employee/useCases";

const employeesRoutes: Router = Router();
const employeeRoutes: Router = Router();

const uploadAvatar: Multer = multer(upload("employees"));

const findEmployeeByEmailController = container.resolve(
  FindEmployeeByEmailController
);
const findEmployeeByIdController = container.resolve(
  FindEmployeeByIdController
);
const listEmployeesController = container.resolve(ListEmployeesController);
const createEmployeeController = container.resolve(CreateEmployeeController);
const updateEmployeeController = container.resolve(UpdateEmployeeController);
const changeStatusEmployeeController = container.resolve(
  ChangeStatusEmployeeController
);
const addEmployeeAvatarController = container.resolve(
  AddEmployeeAvatarController
);
const deleteEmployeeController = container.resolve(DeleteEmployeeController);

employeeRoutes.get("/", findEmployeeByEmailController.handle);
employeesRoutes.get("/:id", findEmployeeByIdController.handle);
employeesRoutes.get("/", listEmployeesController.handle);
employeesRoutes.post("/", createEmployeeController.handle);
employeesRoutes.put("/:id", updateEmployeeController.handle);
employeesRoutes.patch("/:id", changeStatusEmployeeController.handle);
employeesRoutes.delete("/:id", deleteEmployeeController.handle);

employeesRoutes.patch(
  "/avatar/:id",
  uploadAvatar.single("file"),
  addEmployeeAvatarController.handle
);

export { employeesRoutes, employeeRoutes };
