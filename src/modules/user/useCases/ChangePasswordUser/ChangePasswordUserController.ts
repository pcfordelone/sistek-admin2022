import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { IUser } from "@user/core";
import { ChangePasswordUserUseCase } from "@user/useCases";

@injectable()
export class ChangePasswordUserController {
  async handle(request: Request, response: Response) {
    const { password, confirm_password } = request.body;
    const id: string = request.params.id;

    const changePasswordUserUseCase: ChangePasswordUserUseCase =
      container.resolve(ChangePasswordUserUseCase);

    try {
      const result: Omit<IUser, "password"> =
        await changePasswordUserUseCase.execute(id, {
          password,
          confirmPassword: confirm_password,
        });

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
