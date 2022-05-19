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

  async execute(id: string, data: UdpateEmployeeRequest) {
    const oldEmployee = await this.employeeRepository.findEmployeeById(id);

    const user = await this.updateUserUseCase.execute(oldEmployee.user_id, {
      name: data.name || undefined,
      email: data.email || undefined,
    });

    if (user instanceof Error) {
      throw new Error(user.message || "Unknown error creating User");
    }

    if (!oldEmployee) {
      throw new Error("Invalid employee.");
    }

    if (data.name && data.name.length < 3) {
      throw new Error("Name is required and must be longer than 3 characters!");
    }

    if (data.email) {
      const verifyEmailemployee: IEmployee =
        await this.employeeRepository.findEmployeeByEmail(data.email);

      if (
        verifyEmailemployee &&
        oldEmployee.email !== verifyEmailemployee.email
      ) {
        throw new Error("E-mail is already registered.");
      }
    }

    const employee_data = {
      ...oldEmployee,
      name: data.name,
      email: data.email,
      vacation: new Date(data.vacation),
      birthday: new Date(data.birthday),
      phone: data.phone,
      position: data.position,
      avatar_url: data.avatar_url,
      address: data.address,
      a_complement: data.a_complement,
      a_cep: data.a_cep,
      a_city: data.a_city,
      a_state: data.a_state,
    };
    const employee = new EmployeeEntity(employee_data, id);

    const result: IEmployee = await this.employeeRepository.updateEmployee(
      id,
      employee
    );

    return result;
  }
}
