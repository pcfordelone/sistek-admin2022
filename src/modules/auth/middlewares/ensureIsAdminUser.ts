import { NextFunction, Request, Response } from "express";

type TEnsureIsAdminUser = {
  (request: Request, response: Response, next: NextFunction): void | Response;
};

export const ensureIsAdminUser: TEnsureIsAdminUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRole = request.user_role;

  if (userRole === "USER") {
    return response.status(401).json({
      message: "Invalid User",
    });
  }

  return next();
};
