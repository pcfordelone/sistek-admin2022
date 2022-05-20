import { Request, Response, Router } from "express";

import { authenticateController } from "./AuthenticateUser";

const authRoutes: Router = Router();

authRoutes.post("/login", (request: Request, response: Response) => {
  authenticateController.handle(request, response);
});

export { authRoutes };
