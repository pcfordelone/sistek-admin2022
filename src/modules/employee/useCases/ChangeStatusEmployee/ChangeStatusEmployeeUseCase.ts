import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";
import { IEmployee } from "@employee/core";

@injectable()
export class ChangeStatusEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: string) {
    const employee: IEmployee = await this.employeeRepository.findEmployeeById(
      id,
      false
    );

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    employee.isActive = !employee.isActive;

    const updatedEmployee = await this.employeeRepository.updateEmployee(
      id,
      employee
    );

    return updatedEmployee;
  }
}
