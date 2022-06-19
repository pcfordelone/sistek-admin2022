import { Request, Response } from "express";
import { ChangeUserRoleUseCase } from "./ChangeUserRoleUseCase";
import { IUser } from "../../core/domain/IUser";

export class ChangeUserRoleController {
  constructor(private changeUserRoleUseCase: ChangeUserRoleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    try {
      const result: Omit<IUser, "password"> =
        await this.changeUserRoleUseCase.execute(id);

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
