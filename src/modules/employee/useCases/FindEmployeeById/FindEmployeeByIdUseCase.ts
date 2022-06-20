import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";

@injectable()
export class FindEmployeeByIdUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: string, user?: boolean) {
    const employee = await this.employeeRepository.findEmployeeById(
      id,
      true,
      user
    );

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    return employee;
  }
}
