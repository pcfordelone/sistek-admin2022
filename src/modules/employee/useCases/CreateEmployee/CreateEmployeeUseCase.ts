import { IUserRepository } from "./../../../user/core/repository/IUserRepository";
import { IEmployeeRepository } from "../../core/repository/IEmployeeRepository";
import { ICreateEmployeeRequest } from "./CreateEmployeeDTO";
import { CreateUserUseCase } from "../../../user/useCases/CreateUser/CreateUserUseCase";
import { IUser } from "../../../user/core/domain/IUser";

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private createUserUseCase: CreateUserUseCase
  ) {}

  async execute(data: ICreateEmployeeRequest) {
    const user: Omit<IUser, "password"> | Error =
      await this.createUserUseCase.execute({
        name: data.name,
        email: data.email,
        isActive: true,
        password: data.password,
        confirm_password: data.confirm_password,
        role: "USER",
      });

    if (user instanceof Error) {
      throw new Error(user.message || "Unknown error creating User");
    }

    const employeeExists = await this.employeeRepository.findEmployeeByEmail(
      data.email
    );

    if (employeeExists) {
      throw new Error("Employee already exists with this email");
    }

    delete data.password;
    delete data.confirm_password;

    const employee_data = {
      ...data,
      user_id: user.id,
    };

    const result = await this.employeeRepository.createEmployee(employee_data);

    return result;
  }
}
