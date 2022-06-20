import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { ListPayStubsUseCase } from "@pay_stub/useCases";

@injectable()
export class ListPayStubsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, month, order, employee_id } = request.query;

    const listPayStubsUseCase = container.resolve(ListPayStubsUseCase);

    try {
      const result = await listPayStubsUseCase.execute(
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
