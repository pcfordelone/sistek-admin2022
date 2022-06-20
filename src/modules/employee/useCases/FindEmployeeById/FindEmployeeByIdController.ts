import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { FindEmployeeByIdUseCase } from "@employee/useCases";

@injectable()
export class FindEmployeeByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findEmployeeByIdUseCase = container.resolve(FindEmployeeByIdUseCase);

    try {
      const result = await findEmployeeByIdUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
