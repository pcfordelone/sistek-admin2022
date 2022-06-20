import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { IEmployee } from "@employee/core";
import { ListEmployeesUseCase } from "@employee/useCases";

@injectable()
export class ListEmployeesController {
  async handle(request: Request, response: Response) {
    const args = request.query;

    const listEmployeesUseCase = container.resolve(ListEmployeesUseCase);

    try {
      const result: IEmployee[] = await listEmployeesUseCase.execute(args);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
