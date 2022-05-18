import {
  IUserRepository,
  TFindManyUsersArgs,
} from "../../core/repository/IUserRepository";
import { IUser } from "../../core/domain/IUser";

export class ListAdminUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(args?: TFindManyUsersArgs) {
    const result: Omit<IUser, "password">[] =
      await this.userRepository.findManyUsers(args);

    return result;
  }
}
