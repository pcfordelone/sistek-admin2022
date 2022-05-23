import { Request, Response } from "express";
import { UpdatePayStubUseCase } from "./UpdatePayStubUseCase";
import { IPayStub } from "../../core/domain/IPayStub";

export class UpdatePayStubController {
  constructor(private updatePayStubUseCase: UpdatePayStubUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { date, file_url, employee_id, notes } = request.body;
    const { id } = request.params;

    try {
      const result: IPayStub = await this.updatePayStubUseCase.execute(id, {
        date,
        file_url,
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
