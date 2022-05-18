import { Request, Response, response } from "express";
import { IUser } from "../../core/domain/IUser";
import { DeleteAdminUserUseCase } from "./DeleteAdminUserUseCase";

export class DeleteAdminUserController {
  constructor(private deleteAdminUserUseCase: DeleteAdminUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    try {
      const result: Omit<IUser, "password"> =
        await this.deleteAdminUserUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
