import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdminUsersUseCase } from "@user/useCases";
import { IUser } from "@user/core";

export class ListAdminUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const args = request.query;

    const listAdminUsersUseCase = container.resolve(ListAdminUsersUseCase);

    try {
      const result: Omit<IUser, "password">[] =
        await listAdminUsersUseCase.execute(args);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
