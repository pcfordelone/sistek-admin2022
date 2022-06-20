import { IUser } from "@user/core";

export type TFindManyUsersArgs = {
  take?: number;
  skip?: number;
};

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser>;

  findUserById(id: string): Promise<Omit<IUser, "password">>;

  findUserByIdWithPassword(id: string): Promise<IUser>;

  createUser(
    data: Omit<IUser, "created_at" | "updated_at">
  ): Promise<Omit<IUser, "password">>;

  updateUser(
    id: string,
    data: Omit<IUser, "id" | "created_at" | "updated_at">
  ): Promise<Omit<IUser, "password">>;

  deleteUser(id: string): Promise<Omit<IUser, "password">>;

  findManyUsers(args?: TFindManyUsersArgs): Promise<Omit<IUser, "password">[]>;
}
