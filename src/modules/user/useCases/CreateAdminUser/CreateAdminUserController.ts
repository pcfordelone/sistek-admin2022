import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { CreateAdminUserUseCase } from "@user/useCases";
import { IUser } from "@user/core";

@injectable()
export class CreateAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirm_password } = request.body;

    const createAdminUserUseCase = container.resolve(CreateAdminUserUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await createAdminUserUseCase.execute({
          name,
          email,
          password,
          confirm_password,
          role: "ADMIN",
          isActive: false,
        });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
