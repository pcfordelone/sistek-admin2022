import { Request, Response } from "express";
import { ChangeStatusEmployeeUseCase } from "./ChangeStatusEmployeeUseCase";

export class ChangeStatusEmployeeController {
  constructor(
    private changeStatusEmployeeUseCase: ChangeStatusEmployeeUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const result = await this.changeStatusEmployeeUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
