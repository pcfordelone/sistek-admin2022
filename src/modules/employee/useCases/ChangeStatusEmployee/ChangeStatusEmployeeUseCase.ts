import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
import { IEmployee } from "../../core/domain/IEmployee";
export class ChangeStatusEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

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
