import { IUser } from "@user/core";

export interface IAuthenticateProvider {
  authenticate(user: IUser): Promise<string | { error: Error }>;
}
