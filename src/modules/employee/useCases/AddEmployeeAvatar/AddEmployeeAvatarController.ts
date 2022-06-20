import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { AddEmployeeAvatarUseCase } from "@employee/useCases";

@injectable()
export class AddEmployeeAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { file } = request;

    const addEmployeeAvatarUseCase = container.resolve(
      AddEmployeeAvatarUseCase
    );
    try {
      const result = await addEmployeeAvatarUseCase.execute(id, file.filename);

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
