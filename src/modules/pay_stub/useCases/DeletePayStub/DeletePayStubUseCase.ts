import { inject, injectable } from "tsyringe";

import { deleteFile } from "@config/multer";
import { IPayStubRepository } from "@pay_stub/core";
import { IPayStub } from "@pay_stub/core";

@injectable()
export class DeletePayStubUseCase {
  constructor(
    @inject("PayStubRepository")
    private payStubRepository: IPayStubRepository
  ) {}

  async execute(id: string) {
    const payStubExists: IPayStub =
      await this.payStubRepository.findPayStubById(id);

    if (!payStubExists) {
      throw new Error("Invalid Pay Stub");
    }

    deleteFile(`uploads/pay_stubs/${payStubExists.file_url}`);

    const result = await this.payStubRepository.deletePayStub(id);

    return result;
  }
}
