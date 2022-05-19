import { Request, Response } from "express";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

export class UpdateEmployeeController {
  constructor(private updateEmployeeUseCase: UpdateEmployeeUseCase) {}

  async handle(request: Request, response: Response) {
    const data = request.body;
    const id: string = request.params.id;

    try {
      const result = await this.updateEmployeeUseCase.execute(id, data);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
