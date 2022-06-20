import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { IPayStub } from "@pay_stub/core";
import { DeletePayStubUseCase } from "@pay_stub/useCases";

@injectable()
export class DeletePayStubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePayStubUseCase = container.resolve(DeletePayStubUseCase);

    try {
      const result: IPayStub = await deletePayStubUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
