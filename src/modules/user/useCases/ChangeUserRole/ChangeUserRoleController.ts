import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { ChangeUserRoleUseCase } from "@user/useCases";
import { IUser } from "@user/core";

@injectable()
export class ChangeUserRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    const changeUserRoleUseCase = container.resolve(ChangeUserRoleUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await changeUserRoleUseCase.execute(id);

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
