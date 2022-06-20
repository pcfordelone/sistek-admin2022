import { inject, injectable } from "tsyringe";

import { IEmployeeRepository } from "@employee/core";
import { IEmployee } from "@employee/core";
import { EmployeeEntity } from "@employee/core";

import { UdpateEmployeeRequest } from "./UpdateEmployeeDTO";
import { UpdateUserUseCase } from "@user/useCases";

@injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
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
      since,
      rg,
      cpf,
      phone,
      position,
    }: UdpateEmployeeRequest
  ) {
    const oldEmployee = await this.employeeRepository.findEmployeeById(
      id,
      false
    );

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
      vacation: vacation ? new Date(vacation) : undefined,
      birthday: birthday ? new Date(birthday) : undefined,
      since: since ? new Date(since) : undefined,
      isActive,
      rg,
      cpf,
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
