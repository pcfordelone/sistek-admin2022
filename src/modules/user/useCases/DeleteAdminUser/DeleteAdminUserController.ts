import { Request, Response } from "express";
import { container } from "tsyringe";

import { IUser } from "@user/core";
import { DeleteAdminUserUseCase } from "@user/useCases";

export class DeleteAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    const deleteAdminUserUseCase = container.resolve(DeleteAdminUserUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await deleteAdminUserUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
