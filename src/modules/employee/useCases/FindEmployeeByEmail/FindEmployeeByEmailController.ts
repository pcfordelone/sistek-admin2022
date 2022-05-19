import { Request, Response } from "express";
import { FindEmployeeByEmailUseCase } from "./FindEmployeeByEmailUseCase";

export class FindEmployeeByEmailController {
  constructor(private findEmployeeByEmailUseCase: FindEmployeeByEmailUseCase) {}

  async handle(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const result = await this.findEmployeeByEmailUseCase.execute(email);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
