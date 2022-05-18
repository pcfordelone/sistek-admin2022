import { User } from "@prisma/client";
import { Request, Response } from "express";
import { ChangeStatusAdminUserUseCase } from "./ChangeStatusAdminUserUseCase";

export class ChangeStatusAdminUserController {
  constructor(
    private changeStatusAdminUserUseCase: ChangeStatusAdminUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    try {
      const result: Omit<User, "password"> =
        await this.changeStatusAdminUserUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
