import { IUser } from "../../user/core/domain/IUser";

export interface IAuthenticateProvider {
  authenticate(user: IUser): Promise<string | { error: Error }>;
}
