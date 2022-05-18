import { Request, Response } from "express";
import { CreateAdminUserUseCase } from "./CreateAdminUserUseCase";
import { IUser } from "../../core/domain/IUser";

export class CreateAdminUserController {
  constructor(private createAdminUserUseCase: CreateAdminUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirm_password } = request.body;

    try {
      const result: Omit<IUser, "password"> =
        await this.createAdminUserUseCase.execute({
          name,
          email,
          password,
          confirm_password,
          role: "ADMIN",
        });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
