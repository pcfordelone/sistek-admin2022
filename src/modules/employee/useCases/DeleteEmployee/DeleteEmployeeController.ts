import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { DeleteEmployeeUseCase } from "@employee/useCases";
import { IEmployee } from "@employee/core";

@injectable()
export class DeleteEmployeeController {
  async handle(request: Request, response: Response) {
    const id: string = request.params.id;

    const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);

    try {
      const result: IEmployee = await deleteEmployeeUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
