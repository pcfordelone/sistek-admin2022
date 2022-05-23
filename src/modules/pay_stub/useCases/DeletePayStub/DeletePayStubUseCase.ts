import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { IPayStub } from "../../core/domain/IPayStub";

export class DeletePayStubUseCase {
  constructor(private payStubRepository: IPayStubRepository) {}

  async execute(id: string) {
    const payStubExists: IPayStub =
      await this.payStubRepository.findPayStubById(id);

    if (!payStubExists) {
      throw new Error("Invalid Pay Stub");
    }

    const result = await this.payStubRepository.deletePayStub(id);

    return result;
  }
}
