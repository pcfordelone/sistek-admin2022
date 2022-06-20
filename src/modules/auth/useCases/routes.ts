import { Router } from "express";
import { container } from "tsyringe";

import { AuthenticateUserController } from "@auth/useCases";

const authRoutes: Router = Router();

const authenticateController = container.resolve(AuthenticateUserController);

authRoutes.post("/login", authenticateController.handle);

export { authRoutes };
