import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { UpdatePayStubUseCase } from "@pay_stub/useCases";
import { IPayStub } from "@pay_stub/core";

@injectable()
export class UpdatePayStubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { date, employee_id, notes } = request.body;
    const { id } = request.params;

    const updatePayStubUseCase = container.resolve(UpdatePayStubUseCase);
    try {
      const result: IPayStub = await updatePayStubUseCase.execute(id, {
        date,
        file_url: file.filename,
        employee_id,
        notes,
      });

      response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
