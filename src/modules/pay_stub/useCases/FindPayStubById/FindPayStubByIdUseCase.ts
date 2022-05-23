import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { IPayStub } from "../../core/domain/IPayStub";

export class FindPayStubByIdUseCase {
  constructor(private payStubRepository: IPayStubRepository) {}

  async execute(id: string) {
    const payStub: IPayStub = await this.payStubRepository.findPayStubById(id);

    if (!payStub) {
      throw new Error("Invalid Pay Stub");
    }

    return payStub;
  }
}
