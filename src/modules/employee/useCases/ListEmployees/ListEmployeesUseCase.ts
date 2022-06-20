import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";

@injectable()
export class ListEmployeesUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(args?: { take?: number; skip?: number }) {
    const employees = await this.employeeRepository.findManyEmployees({
      skip: args.skip || undefined,
      take: args.take || undefined,
    });

    return employees;
  }
}
