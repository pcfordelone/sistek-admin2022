import { User } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateAdminUserUseCase } from "./UpdateAdminUserUseCase";

export class UpdateAdminUserController {
  constructor(private updateAdminUserUseCase: UpdateAdminUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const id: string = request.params.id;

    try {
      const result: Omit<User, "password"> =
        await this.updateAdminUserUseCase.execute(id, {
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
