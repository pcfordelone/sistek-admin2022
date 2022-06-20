import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdminUserUseCase } from "@user/useCases";
import { IUser } from "@user/core";

export class UpdateAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const id: string = request.params.id;

    const updateAdminUserUseCase = container.resolve(UpdateAdminUserUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await updateAdminUserUseCase.execute(id, {
          name,
          email,
        });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
