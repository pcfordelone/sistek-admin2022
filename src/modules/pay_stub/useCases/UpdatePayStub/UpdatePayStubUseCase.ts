import { inject, injectable } from "tsyringe";

import { deleteFile } from "@config/multer";

import { IPayStubRepository } from "@pay_stub/core";
import { PayStubEntity } from "@pay_stub/core";
import { IPayStub } from "@pay_stub/core";
import { IUpdatePayStubRequest } from "./UpdatePayStubDTO";
import { IEmployeeRepository } from "@employee/core";
import { IEmployee } from "@employee/core";

@injectable()
export class UpdatePayStubUseCase {
  constructor(
    @inject("PayStubRepository")
    private payStubRepository: IPayStubRepository,
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(
    id: string,
    { date, employee_id, file_url, notes }: IUpdatePayStubRequest
  ) {
    const payStub: IPayStub = await this.payStubRepository.findPayStubById(id);

    if (!payStub) {
      throw new Error("Invalid PayStub");
    }

    const employee: IEmployee = await this.employeeRepository.findEmployeeById(
      employee_id
    );

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    if (!date) {
      throw new Error("Date is required");
    }

    if (!file_url) {
      throw new Error("File is required");
    }

    const deleteImage = await deleteFile(
      `./uploads/pay_stubs/${payStub.file_url}`
    );

    console.log(deleteImage);

    const entity = new PayStubEntity(
      {
        ...payStub,
        date: new Date(date),
        employee_id,
        file_url,
        notes,
      },
      id
    );
    const result = await this.payStubRepository.updatePayStub(id, entity);

    return result;
  }
}
