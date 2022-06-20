import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { FindEmployeeByEmailUseCase } from "@employee/useCases";

@injectable()
export class FindEmployeeByEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const findEmployeeByEmailUseCase = container.resolve(
      FindEmployeeByEmailUseCase
    );

    try {
      const result = await findEmployeeByEmailUseCase.execute(email);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unknown error, try again later",
      });
    }
  }
}
