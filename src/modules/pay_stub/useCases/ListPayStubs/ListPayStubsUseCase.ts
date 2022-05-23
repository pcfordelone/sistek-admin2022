import { IPayStubRepository } from "../../core/reposity/IPayStubRepository";
import { IEmployeeRepository } from "../../../employee/core/repository/IEmployeeRepository";
import { IEmployee } from "../../../employee/core/domain/IEmployee";
export class ListPayStubsUseCase {
  constructor(
    private payStubRepository: IPayStubRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(
    year?: string,
    month?: string,
    order?: string,
    employee_id?: string
  ) {
    if (employee_id) {
      const employee: IEmployee =
        await this.employeeRepository.findEmployeeById(employee_id);

      if (!employee) {
        throw new Error("Invalid Employee");
      }
    }

    if (month) {
      const monthDate: Date = new Date(month);
    }

    const result = await this.payStubRepository.listPayStubs(
      Number(year),
      Number(month),
      order,
      employee_id
    );

    return result;
  }
}
