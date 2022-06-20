import { inject, injectable } from "tsyringe";

import { deleteFile } from "@config/multer";
import { IEmployeeRepository } from "@employee/core";

@injectable()
export class AddEmployeeAvatarUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(employee_id: string, avatar_url: string) {
    const employee = await this.employeeRepository.findEmployeeById(
      employee_id,
      false
    );

    if (!employee) {
      throw new Error("Invalid Employee");
    }

    if (!avatar_url) {
      throw new Error("File is required");
    }

    if (employee.avatar_url) {
      deleteFile(`uploads/employees/${employee.avatar_url}`);
    }

    const newEmployee = { ...employee, avatar_url };

    const updatedEmployee = await this.employeeRepository.updateEmployee(
      employee_id,
      newEmployee
    );

    return updatedEmployee;
  }
}
