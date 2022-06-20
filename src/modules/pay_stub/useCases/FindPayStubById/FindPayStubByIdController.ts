import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { IPayStub } from "@pay_stub/core";
import { FindPayStubByIdUseCase } from "@pay_stub/useCases";

@injectable()
export class FindPayStubByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdPayStubUseCase = container.resolve(FindPayStubByIdUseCase);

    try {
      const result: IPayStub = await findByIdPayStubUseCase.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message || "Unknown Error",
      });
    }
  }
}
