import multer from "multer";
import { json, Request, Response } from "express";
import { CreatePayStubUseCase } from "./CreatePayStubUseCase";

export class CreatePayStubController {
  constructor(private createPayStubUseCase: CreatePayStubUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { date, employee_id, notes } = request.body;

    try {
      const result = await this.createPayStubUseCase.execute({
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
