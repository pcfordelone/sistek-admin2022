import { prismaClient } from "../../../../prisma";
import { IUser } from "../domain/IUser";
import { IUserRepository, TFindManyUsersArgs } from "./IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async findUserById(id: string): Promise<Omit<IUser, "password">> {
    const result: Omit<IUser, "password"> = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });

    return result;
  }

  async findUserByIdWithPassword(id: string): Promise<IUser> {
    const result: IUser = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  }

  async findUserByEmail(email: string): Promise<IUser> {
    const user: IUser = await prismaClient.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  async createUser(
    data: Omit<IUser, "created_at" | "updated_at">
  ): Promise<Omit<IUser, "password">> {
    const user: Omit<IUser, "password"> = await prismaClient.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async updateUser(
    id: string,
    data: Omit<IUser, "created_at" | "updated_at">
  ): Promise<Omit<IUser, "password">> {
    const user: Omit<IUser, "password"> = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<Omit<IUser, "password">> {
    const user: Omit<IUser, "password"> = await prismaClient.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }

  async findManyUsers(
    args: TFindManyUsersArgs
  ): Promise<Omit<IUser, "password">[]> {
    const users: Omit<IUser, "password">[] = await prismaClient.user.findMany({
      take: args.take || undefined,
      skip: args.skip || undefined,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        role: "ADMIN",
      },
    });

    return users;
  }
}
