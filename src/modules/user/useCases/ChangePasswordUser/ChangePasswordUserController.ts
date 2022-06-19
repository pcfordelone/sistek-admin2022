import { Request, Response } from "express";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";
import { IUser } from "../../core/domain/IUser";

export class ChangePasswordUserController {
  constructor(private changePasswordUserUseCase: ChangePasswordUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { password, confirm_password } = request.body;
    const id: string = request.params.id;

    try {
      const result: Omit<IUser, "password"> =
        await this.changePasswordUserUseCase.execute(id, {
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
