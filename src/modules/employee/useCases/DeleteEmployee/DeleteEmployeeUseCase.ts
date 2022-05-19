import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
import { IEmployee } from "../../core/domain/IEmployee";
export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string) {
    const employee: IEmployee = await this.employeeRepository.findEmployeeById(
      id
    );

    if (!employee) {
      throw new Error("Invalid User");
    }

    const result = await this.employeeRepository.deleteEmployee(id);

    return result;
  }
}
