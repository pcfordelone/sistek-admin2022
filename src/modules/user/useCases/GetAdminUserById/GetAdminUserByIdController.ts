import { Request, Response } from "express";
import { container } from "tsyringe";

import { IUser } from "@user/core";
import { GetAdminUserByIdUseCase } from "@user/useCases";

export class GetAdminUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const getAdminUserByIdUseCase = container.resolve(GetAdminUserByIdUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await getAdminUserByIdUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
