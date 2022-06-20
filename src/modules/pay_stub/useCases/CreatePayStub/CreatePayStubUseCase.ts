import { inject, injectable } from "tsyringe";

import { ICreatePayStubRequest } from "./CreatePayStubDTO";
import { IPayStubRepository } from "@pay_stub/core";
import { PayStubEntity } from "@pay_stub/core";
import { IPayStub } from "@pay_stub/core";

import { IEmployeeRepository } from "@employee/core";

@injectable()
export class CreatePayStubUseCase {
  constructor(
    @inject("PayStubRepository")
    private payStubRepository: IPayStubRepository,
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute({ date, employee_id, file_url, notes }: ICreatePayStubRequest) {
    const employeeExists = await this.employeeRepository.findEmployeeById(
      employee_id,
      false
    );

    if (!employeeExists) {
      throw new Error("Invalid Employee");
    }

    if (!date) {
      throw new Error("Date is required");
    }

    if (!file_url) {
      throw new Error("File is required");
    }

    const entity: IPayStub = new PayStubEntity({
      date: new Date(date),
      employee_id,
      file_url,
      notes,
    });

    const result: IPayStub = await this.payStubRepository.createPayStub(entity);

    return result;
  }
}
