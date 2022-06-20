import { inject, injectable } from "tsyringe";

import { IUserRepository, TFindManyUsersArgs } from "@user/core";
import { IUser } from "@user/core";

@injectable()
export class ListAdminUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(args?: TFindManyUsersArgs) {
    const result: Omit<IUser, "password">[] =
      await this.userRepository.findManyUsers(args);

    return result;
  }
}
