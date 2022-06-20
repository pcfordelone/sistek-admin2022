import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { CreateEmployeeUseCase } from "@employee/useCases";

@injectable()
export class CreateEmployeeController {
  async handle(request: Request, response: Response) {
    const data = request.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    try {
      const result = await createEmployeeUseCase.execute(data);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
