import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";

export class ListEmployeesUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(args?: { take?: number; skip?: number }) {
    const employees = await this.employeeRepository.findManyEmployees({
      skip: args.skip || undefined,
      take: args.take || undefined,
    });

    return employees;
  }
}
