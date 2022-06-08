import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
import { ICreateEmployeeRequest } from "./CreateEmployeeDTO";
import { CreateUserUseCase } from "../../../user/useCases/CreateUser/CreateUserUseCase";
import { IUser } from "../../../user/core/domain/IUser";
import { EmployeeEntity } from "../../core/domain/Employee";
import { IEmployee } from "../../core/domain/IEmployee";

export class CreateEmployeeUseCase {
  constructor(
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
      birthday,
      vacation,
      since,
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
