import { Request, Response } from "express";
import { injectable, container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

@injectable()
export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const result = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        Error: error.message || "Unexpected Error.",
      });
    }
  }
}
