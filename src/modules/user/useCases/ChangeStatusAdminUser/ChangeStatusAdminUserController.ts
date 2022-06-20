import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { IUser } from "@user/core";
import { ChangeStatusAdminUserUseCase } from "@user/useCases";

@injectable()
export class ChangeStatusAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    const changeStatusAdminUserUseCase = container.resolve(
      ChangeStatusAdminUserUseCase
    );

    try {
      const result: Omit<IUser, "password"> =
        await changeStatusAdminUserUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
