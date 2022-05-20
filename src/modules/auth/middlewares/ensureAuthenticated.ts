import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TEnsureAuthenticated = {
  (request: Request, response: Response, next: NextFunction): void | Response;
};

interface IAuthPayload {
  user: {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
  };
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated: TEnsureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { user } = verify(token, process.env.JWT_SECRET) as IAuthPayload;

    request.user_id = user.id;
    request.user_role = user.role;
    request.user_is_active = user.isActive;

    return next();
  } catch (error) {
    request.user_id = undefined;
    request.user_role = undefined;
    request.user_is_active = undefined;

    return response.status(401).json({
      message: "Token invalid",
    });
  }
};
