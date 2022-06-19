import { prismaClient } from "@config/prisma";
import { IEmployee } from "../domain/IEmployee";
import {
  IEmployeeRepository,
  TFindManyEmployeesArgs,
} from "./IEmployeeRepository";

export class PrismaEmployeeRepository implements IEmployeeRepository {
  async findEmployeeByEmail(email: string): Promise<IEmployee> {
    const result = await prismaClient.employee.findFirst({
      where: {
        email: email,
      },
      include: {
        PayStub: true,
      },
    });

    return result;
  }

  async findEmployeeById(
    id: string,
    payStub?: boolean,
    user?: boolean
  ): Promise<IEmployee> {
    const result = await prismaClient.employee.findFirst({
      where: {
        id: id,
      },
      include: {
        PayStub: payStub || false,
        user: user || false,
      },
    });

    return result;
  }

  async findEmployeeByIdWithPayStub(id: string): Promise<IEmployee> {
    const result = await prismaClient.employee.findFirst({
      where: {
        id: id,
      },
      include: {
        PayStub: true,
      },
    });

    return result;
  }

  async createEmployee(
    data: Omit<IEmployee, "created_at" | "updated_at">
  ): Promise<IEmployee> {
    const result = prismaClient.employee.create({
      data,
    });

    return result;
  }

  async updateEmployee(
    id: string,
    data: Omit<IEmployee, "created_at" | "updated_at" | "id">
  ): Promise<IEmployee> {
    const result = prismaClient.employee.update({
      where: {
        id: id,
      },
      data,
    });

    return result;
  }

  async deleteEmployee(id: string): Promise<IEmployee> {
    const result = prismaClient.employee.delete({
      where: {
        id: id,
      },
    });

    return result;
  }

  async findManyEmployees(
    args?: TFindManyEmployeesArgs
  ): Promise<Omit<IEmployee, "password">[]> {
    const result = prismaClient.employee.findMany({
      take: args.take || undefined,
      skip: args.skip || undefined,
      include: {
        user: true,
        PayStub: true,
      },
    });

    return result;
  }
}
