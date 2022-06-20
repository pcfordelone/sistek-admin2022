import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { ChangeStatusEmployeeUseCase } from "@employee/useCases";

@injectable()
export class ChangeStatusEmployeeController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const changeStatusEmployeeUseCase = container.resolve(
      ChangeStatusEmployeeUseCase
    );

    try {
      const result = await changeStatusEmployeeUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
