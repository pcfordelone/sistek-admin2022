import { ICreatePayStubRequest } from "./CreatePayStubDTO";
import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { PayStubEntity } from "../../core/domain/PayStub";
import { IEmployeeRepository } from "../../../employee/core/repository/IEmployeeRepository";
import { IPayStub } from "../../core/domain/IPayStub";

export class CreatePayStubUseCase {
  constructor(
    private payStubRepository: IPayStubRepository,
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
