import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";
import { IEmployee } from "@employee/core";

@injectable()
export class DeleteEmployeeUseCase {
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
      throw new Error("Invalid User");
    }

    const result = await this.employeeRepository.deleteEmployee(id);

    return result;
  }
}
