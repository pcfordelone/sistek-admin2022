import { Request, Response, Router } from "express";
import { changeStatusEmployeeController } from "./ChangeStatusEmployee";
import { createEmployeeControleer } from "./CreateEmployee";
import { deleteEmployeeController } from "./DeleteEmployee";
import { findEmployeeByIdController } from "./FindEmployeeById";
import { listEmployeesController } from "./ListEmployees";
import { updateEmployeeController } from "./UpdateEmployee";

const employeesRoutes: Router = Router();

employeesRoutes.get("/:id", (request: Request, response: Response) => {
  findEmployeeByIdController.handle(request, response);
});

employeesRoutes.get("/", (request: Request, response: Response) => {
  listEmployeesController.handle(request, response);
});

employeesRoutes.post("/", (request: Request, response: Response) => {
  createEmployeeControleer.handle(request, response);
});

employeesRoutes.put("/:id", (request: Request, response: Response) => {
  updateEmployeeController.handle(request, response);
});

employeesRoutes.patch("/:id", (request: Request, response: Response) => {
  changeStatusEmployeeController.handle(request, response);
});

employeesRoutes.delete("/:id", (request: Request, response: Response) => {
  deleteEmployeeController.handle(request, response);
});

export { employeesRoutes };
