import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { UpdateEmployeeUseCase } from "@employee/useCases";

@injectable()
export class UpdateEmployeeController {
  async handle(request: Request, response: Response) {
    const data = request.body;
    const id: string = request.params.id;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);

    try {
      const result = await updateEmployeeUseCase.execute(id, data);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
