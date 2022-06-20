import { Router } from "express";
import { ensureIsAdminUser } from "../../auth/middlewares/ensureIsAdminUser";
import { container } from "tsyringe";

import { ChangePasswordUserController } from "@user/useCases";
import { ChangeStatusAdminUserController } from "@user/useCases";
import { CreateAdminUserController } from "@user/useCases";
import { ChangeUserRoleController } from "@user/useCases";
import { GetAdminUserByIdController } from "@user/useCases";
import { ListAdminUsersController } from "@user/useCases";
import { UpdateAdminUserController } from "@user/useCases";
import { DeleteAdminUserController } from "@user/useCases";

const userRoutes: Router = Router();

const changePasswordUserController = container.resolve(
  ChangePasswordUserController
);
const changeStatusAdminUserController = container.resolve(
  ChangeStatusAdminUserController
);
const createAdminUserController = container.resolve(CreateAdminUserController);
const changeUserRoleController = container.resolve(ChangeUserRoleController);
const getAdminUserByIdController = container.resolve(
  GetAdminUserByIdController
);
const listAdminUsersController = container.resolve(ListAdminUsersController);
const updateAdminUserController = container.resolve(UpdateAdminUserController);
const deleteAdminUserController = container.resolve(DeleteAdminUserController);

userRoutes.get("/:id", getAdminUserByIdController.handle);
userRoutes.get("/", ensureIsAdminUser, listAdminUsersController.handle);
userRoutes.post("/", ensureIsAdminUser, createAdminUserController.handle);
userRoutes.put("/:id", ensureIsAdminUser, updateAdminUserController.handle);
userRoutes.patch("/change-password/:id", changePasswordUserController.handle);
userRoutes.delete("/:id", ensureIsAdminUser, deleteAdminUserController.handle);

userRoutes.patch(
  "/:id",
  ensureIsAdminUser,
  changeStatusAdminUserController.handle
);

userRoutes.patch(
  "/role/:id",
  ensureIsAdminUser,
  changeUserRoleController.handle
);

export { userRoutes };
