import { inject, injectable } from "tsyringe";

import { IPayStubRepository } from "@pay_stub/core";
import { IEmployeeRepository } from "@employee/core";
import { IEmployee } from "@employee/core";

@injectable()
export class ListPayStubsUseCase {
  constructor(
    @inject("PayStubRepository")
    private payStubRepository: IPayStubRepository,
    @inject("EmployeRepository")
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
