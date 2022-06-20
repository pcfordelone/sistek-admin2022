import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";

@injectable()
export class FindEmployeeByEmailUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(email: string) {
    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    return employee;
  }
}
