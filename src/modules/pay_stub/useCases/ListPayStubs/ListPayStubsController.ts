import { Request, Response } from "express";
import { ListPayStubsUseCase } from "./ListPayStubsUseCase";

export class ListPayStubsController {
  constructor(private listPayStubsUseCase: ListPayStubsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { year, month, order, employee_id } = request.query;

    try {
      const result = await this.listPayStubsUseCase.execute(
        year as string,
        month as string,
        order as string,
        employee_id as string
      );

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown error, try again soon",
      });
    }
  }
}
