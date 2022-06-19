import { prismaClient } from "@config/prisma";
import { IPayStub } from "../domain/IPayStub";
import { IPayStubRepository } from "./IPayStubRepository";

export class PrismaPayStubRepository implements IPayStubRepository {
  async listPayStubs(
    year?: number,
    month?: number,
    order?: "asc" | "desc",
    employee_id?: string
  ) {
    const start_date: Date = new Date(year || 2022, month - 1, 1);
    const end_date: Date = new Date(year || 2022, month, 0);

    const result: IPayStub[] = await prismaClient.payStub.findMany({
      where: {
        date: {
          gte: year && month ? start_date : undefined,
          lt: year && month ? end_date : undefined,
        },
        employee_id: employee_id || undefined,
      },
      orderBy: [
        {
          date: order === "asc" ? "asc" : "desc",
        },
      ],
    });

    return result;
  }

  async createPayStub(
    data: Omit<IPayStub, "created_at" | "updated_at">
  ): Promise<IPayStub> {
    const result: IPayStub = await prismaClient.payStub.create({
      data,
    });

    return result;
  }

  async updatePayStub(
    id: string,
    data: Omit<IPayStub, "id" | "created_at" | "updated_at">
  ): Promise<IPayStub> {
    const result: IPayStub = await prismaClient.payStub.update({
      where: {
        id,
      },
      data,
    });

    return result;
  }
  async deletePayStub(id: string): Promise<IPayStub> {
    const result: IPayStub = await prismaClient.payStub.delete({
      where: {
        id,
      },
    });

    return result;
  }
  async findPayStubById(id: string): Promise<IPayStub> {
    const result = await prismaClient.payStub.findFirst({
      where: {
        id,
      },
    });

    return result;
  }
}
