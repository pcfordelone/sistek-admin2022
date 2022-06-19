import { Request, Response } from "express";
import { FindEmployeeByIdUseCase } from "./FindEmployeeByIdUseCase";

export class FindEmployeeByIdController {
  constructor(private findEmployeeByIdUseCase: FindEmployeeByIdUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const result = await this.findEmployeeByIdUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
