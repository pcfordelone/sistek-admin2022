import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
export class ChangeStatusEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string) {
    const employee = await this.employeeRepository.findEmployeeById(id);

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
