import { Request, Response } from "express";
import { AddEmployeeAvatarUseCase } from "./AddEmployeeAvatarUseCase";

export class AddEmployeeAvatarController {
  constructor(private addEmployeeAvatarUseCase: AddEmployeeAvatarUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { file } = request;

    try {
      const result = await this.addEmployeeAvatarUseCase.execute(
        id,
        file.filename
      );

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
