import { Request, Response } from "express";
import { IPayStub } from "../../core/domain/IPayStub";
import { DeletePayStubUseCase } from "./DeletePayStubUseCase";

export class DeletePayStubController {
  constructor(private deletePayStubUseCase: DeletePayStubUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result: IPayStub = await this.deletePayStubUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
