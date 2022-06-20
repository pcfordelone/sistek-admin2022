import { sign } from "jsonwebtoken";
import { injectable } from "tsyringe";

import { IAuthenticateProvider } from "./IAuthenticateProvider";
import { IUser } from "@user/core";

@injectable()
class JWTAuthenticateProvider implements IAuthenticateProvider {
  async authenticate(user: IUser): Promise<string | { error: Error }> {
    const secret: string = process.env.JWT_SECRET;

    const token: string = sign(
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
      }
    );

    return token;
  }
}

export { JWTAuthenticateProvider };
