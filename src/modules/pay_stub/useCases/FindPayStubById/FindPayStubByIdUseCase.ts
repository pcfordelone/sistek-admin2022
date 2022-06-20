import { inject, injectable } from "tsyringe";

import { IPayStubRepository } from "@pay_stub/core";
import { IPayStub } from "@pay_stub/core";

@injectable()
export class FindPayStubByIdUseCase {
  constructor(
    @inject("PayStubRepositoru")
    private payStubRepository: IPayStubRepository
  ) {}

  async execute(id: string) {
    const payStub: IPayStub = await this.payStubRepository.findPayStubById(id);

    if (!payStub) {
      throw new Error("Invalid Pay Stub");
    }

    return payStub;
  }
}
