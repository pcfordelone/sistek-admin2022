import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { IUpdatePayStubRequest } from "./UpdatePayStubDTO";
import { PayStubEntity } from "../../core/domain/PayStub";
import { IEmployeeRepository } from "../../../employee/core/repository/IEmployeeRepository";
import { IPayStub } from "../../core/domain/IPayStub";
import { IEmployee } from "../../../employee/core/domain/IEmployee";
import { deleteFile } from "../../../../multer";
export class UpdatePayStubUseCase {
  constructor(
    private payStubRepository: IPayStubRepository,
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
