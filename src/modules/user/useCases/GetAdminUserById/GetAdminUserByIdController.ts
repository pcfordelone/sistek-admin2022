import { Request, Response } from "express";
import { IUser } from "../../core/domain/IUser";
import { GetAdminUserByIdUseCase } from "./GetAdminUserByIdUseCase";

export class GetAdminUserByIdController {
  constructor(private getAdminUserByIdUseCase: GetAdminUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    try {
      const result: Omit<IUser, "password"> =
        await this.getAdminUserByIdUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
