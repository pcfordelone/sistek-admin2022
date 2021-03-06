import { IEmployeeRepository } from "@employee/core";
import { EmployeeEntity } from "@employee/core";
import { IEmployee } from "@employee/core";
import { ICreateEmployeeRequest } from "./CreateEmployeeDTO";

import { CreateUserUseCase } from "@user/useCases";
import { IUser } from "@user/core";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
    private createUserUseCase: CreateUserUseCase
  ) {}

  async execute({
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
    password,
    confirm_password,
  }: ICreateEmployeeRequest) {
    const user: Omit<IUser, "password"> | Error =
      await this.createUserUseCase.execute({
        name: name,
        email: email,
        isActive: true,
        password: password,
        confirm_password: confirm_password,
        role: "USER",
      });

    if (user instanceof Error) {
      throw new Error(user.message || "Unknown error creating User");
    }

    const employeeExists = await this.employeeRepository.findEmployeeByEmail(
      email
    );

    if (employeeExists) {
      throw new Error("Employee already exists with this email");
    }

    const employee: IEmployee = new EmployeeEntity({
      name,
      email,
      isActive,
      address,
      a_cep,
      a_city,
      a_complement,
      a_state,
      avatar_url,
      birthday: new Date(birthday),
      vacation: new Date(vacation),
      since: new Date(since),
      rg,
      cpf,
      phone,
      position,
      user_id: user.id,
    });

    const result = await this.employeeRepository.createEmployee(employee);

    return result;
  }
}
