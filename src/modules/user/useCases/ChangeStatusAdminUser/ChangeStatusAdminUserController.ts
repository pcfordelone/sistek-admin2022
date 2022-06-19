import { Request, Response } from "express";
import { IUser } from "../../core/domain/IUser";
import { ChangeStatusAdminUserUseCase } from "./ChangeStatusAdminUserUseCase";

export class ChangeStatusAdminUserController {
  constructor(
    private changeStatusAdminUserUseCase: ChangeStatusAdminUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    try {
      const result: Omit<IUser, "password"> =
        await this.changeStatusAdminUserUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
