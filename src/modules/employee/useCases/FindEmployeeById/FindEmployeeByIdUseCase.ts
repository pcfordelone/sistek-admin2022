import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";

export class FindEmployeeByIdUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string) {
    const employee = await this.employeeRepository.findEmployeeById(id);

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    return employee;
  }
}
