import { IEmployee } from "@employee/core";

export type TFindManyEmployeesArgs = {
  take?: number;
  skip?: number;
};

export interface IEmployeeRepository {
  findEmployeeByEmail(email: string): Promise<IEmployee>;

  findEmployeeById(
    id: string,
    payStub?: boolean,
    user?: boolean
  ): Promise<IEmployee>;

  createEmployee(
    data: Omit<IEmployee, "created_at" | "updated_at">
  ): Promise<IEmployee>;

  updateEmployee(
    id: string,
    data: Omit<IEmployee, "id" | "created_at" | "updated_at">
  ): Promise<IEmployee>;

  deleteEmployee(id: string): Promise<IEmployee>;

  findManyEmployees(
    args?: TFindManyEmployeesArgs
  ): Promise<Omit<IEmployee, "password">[]>;
}
