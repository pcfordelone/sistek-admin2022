import { Request, Response } from "express";
import { ListAdminUsersUseCase } from "./ListAdminUsersUseCase";
import { IUser } from "../../core/domain/IUser";

export class ListAdminUsersController {
  constructor(private listAdminUsersUseCase: ListAdminUsersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const args = request.query;

    try {
      const result: Omit<IUser, "password">[] =
        await this.listAdminUsersUseCase.execute(args);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
