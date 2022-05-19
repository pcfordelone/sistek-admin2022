import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";

export class FindEmployeeByEmailUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(email: string) {
    const employee = await this.employeeRepository.findEmployeeByEmail(email);

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    return employee;
  }
}
