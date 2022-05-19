import { Request, Response } from "express";
import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";
import { IEmployee } from "../../core/domain/IEmployee";
export class DeleteEmployeeController {
  constructor(private deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async handle(request: Request, response: Response) {
    const id: string = request.params.id;

    try {
      const result: IEmployee = await this.deleteEmployeeUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
