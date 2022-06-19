import { Request, Response, Router } from "express";
import { ensureIsAdminUser } from "../../auth/middlewares/ensureIsAdminUser";
import { changePasswordUserController } from "./ChangePasswordUser";
import { changeStatusAdminUserController } from "./ChangeStatusAdminUser";
import { changeUserRoleController } from "./ChangeUserRole";
import { createAdminUserController } from "./CreateAdminUser";
import { deleteAdminUserController } from "./DeleteAdminUser";
import { getAdminUserByIdController } from "./GetAdminUserById";
import { listAdminUsersController } from "./ListAdminUsers";
import { updateAdminUserController } from "./UpdateAdminUser";

const userRoutes: Router = Router();

userRoutes.get("/:id", (request: Request, response: Response) => {
  getAdminUserByIdController.handle(request, response);
});

userRoutes.patch(
  "/change-password/:id",
  (request: Request, response: Response) => {
    changePasswordUserController.handle(request, response);
  }
);

userRoutes.get(
  "/",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    listAdminUsersController.handle(request, response);
  }
);

userRoutes.post(
  "/",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    createAdminUserController.handle(request, response);
  }
);

userRoutes.put(
  "/:id",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    updateAdminUserController.handle(request, response);
  }
);

userRoutes.patch(
  "/:id",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    changeStatusAdminUserController.handle(request, response);
  }
);

userRoutes.patch(
  "/role/:id",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    changeUserRoleController.handle(request, response);
  }
);

userRoutes.delete(
  "/:id",
  ensureIsAdminUser,
  (request: Request, response: Response) => {
    deleteAdminUserController.handle(request, response);
  }
);

export { userRoutes };
