import { Request, Response } from "express";
import { IEmployee } from "../../core/domain/IEmployee";
import { ListEmployeesUseCase } from "./ListEmployeesUseCase";

export class ListEmployeesController {
  constructor(private listEmployeesUseCase: ListEmployeesUseCase) {}

  async handle(request: Request, response: Response) {
    const args = request.query;

    try {
      const result: IEmployee[] = await this.listEmployeesUseCase.execute(args);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
