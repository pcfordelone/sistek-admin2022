import { Request, Response, Router } from "express";
import { changeStatusAdminUserController } from "./ChangeStatusAdminUser";
import { createAdminUserController } from "./CreateAdminUser";
import { deleteAdminUserController } from "./DeleteAdminUser";
import { getAdminUserByIdController } from "./GetAdminUserById";
import { listAdminUsersController } from "./ListAdminUsers";
import { updateAdminUserController } from "./UpdateAdminUser";

const userRoutes: Router = Router();

userRoutes.get("/:id", (request: Request, response: Response) => {
  getAdminUserByIdController.handle(request, response);
});

userRoutes.get("/", (request: Request, response: Response) => {
  listAdminUsersController.handle(request, response);
});

userRoutes.post("/", (request: Request, response: Response) => {
  createAdminUserController.handle(request, response);
});

userRoutes.put("/:id", (request: Request, response: Response) => {
  updateAdminUserController.handle(request, response);
});

userRoutes.patch("/:id", (request: Request, response: Response) => {
  changeStatusAdminUserController.handle(request, response);
});

userRoutes.delete("/:id", (request: Request, response: Response) => {
  deleteAdminUserController.handle(request, response);
});

export { userRoutes };
