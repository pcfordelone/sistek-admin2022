import { Request, Response } from "express";
import { injectable, container } from "tsyringe";
import { CreatePayStubUseCase } from "@pay_stub/useCases";

@injectable()
export class CreatePayStubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { date, employee_id, notes } = request.body;

    const createPayStubUseCase = container.resolve(CreatePayStubUseCase);

    try {
      const result = await createPayStubUseCase.execute({
        date: date,
        file_url: file.filename,
        employee_id: employee_id,
        notes: notes,
      });

      return response.status(201).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
