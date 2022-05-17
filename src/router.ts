import { Request, Response, Router } from "express";

const openRoute: Router = Router();

/**
 * Open Route
 */
openRoute.get("/", (request: Request, response: Response) => {
  response.status(200).json({
    message: `Seja bem vindo a API da Sistek IT Services`,
  });
});

export { openRoute };
