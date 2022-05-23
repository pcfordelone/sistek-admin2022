import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
import { UdpateEmployeeRequest } from "./UpdateEmployeeDTO";
import { IEmployee } from "../../core/domain/IEmployee";
import { EmployeeEntity } from "../../core/domain/Employee";
import { UpdateUserUseCase } from "../../../user/useCases/UpdateUser/UpdateUserUseCase";

export class UpdateEmployeeUseCase {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  async execute(
    id: string,
    {
      name,
      email,
      isActive,
      address,
      a_cep,
      a_city,
      a_complement,
      a_state,
      avatar_url,
      birthday,
      vacation,
      phone,
      position,
    }: UdpateEmployeeRequest
  ) {
    const oldEmployee = await this.employeeRepository.findEmployeeById(id);

    const user = await this.updateUserUseCase.execute(oldEmployee.user_id, {
      name: name,
      email: email,
    });

    if (user instanceof Error) {
      throw new Error(user.message || "Unknown error creating User");
    }

    if (!oldEmployee) {
      throw new Error("Invalid employee.");
    }

    if (name && name.length < 3) {
      throw new Error("Name is required and must be longer than 3 characters!");
    }

    if (email) {
      const verifyEmailemployee: IEmployee =
        await this.employeeRepository.findEmployeeByEmail(email);

      if (
        verifyEmailemployee &&
        oldEmployee.email !== verifyEmailemployee.email
      ) {
        throw new Error("E-mail is already registered.");
      }
    }

    const employee_data = {
      ...oldEmployee,
      name,
      email,
      vacation: new Date(vacation),
      birthday: new Date(birthday),
      isActive,
      phone,
      position,
      avatar_url,
      address,
      a_complement,
      a_cep,
      a_city,
      a_state,
    };

    const employee = new EmployeeEntity(employee_data, id);

    const result: IEmployee = await this.employeeRepository.updateEmployee(
      id,
      employee
    );

    return result;
  }
}
