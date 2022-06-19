import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { IPayStub } from "../../core/domain/IPayStub";
import { deleteFile } from "../../../../multer";

export class DeletePayStubUseCase {
  constructor(private payStubRepository: IPayStubRepository) {}

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
