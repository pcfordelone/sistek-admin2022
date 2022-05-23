import { Request, Response } from "express";
import { IPayStub } from "../../core/domain/IPayStub";
import { FindPayStubByIdUseCase } from "./FindPayStubByIdUseCase";

export class FindPayStubByIdController {
  constructor(private findByIdPayStubUseCase: FindPayStubByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result: IPayStub = await this.findByIdPayStubUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
