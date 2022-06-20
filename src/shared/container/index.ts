import { container } from "tsyringe";

import { IUserRepository } from "@user/core/repository/IUserRepository";
import { PrismaUserRepository } from "@user/core/repository/PrismaUserRepository";
import { IEmployeeRepository } from "@employee/core/repository/IEmployeeRepository";
import { PrismaEmployeeRepository } from "@employee/core/repository/PrismaEmployeeRepository";
import { IPayStubRepository } from "@pay_stub/core/reposity/IPayStubRepository";
import { PrismaPayStubRepository } from "@pay_stub/core/reposity/PrismaPayStubRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  PrismaUserRepository
);

container.registerSingleton<IEmployeeRepository>(
  "EmployeeRepository",
  PrismaEmployeeRepository
);

container.registerSingleton<IPayStubRepository>(
  "PayStubRepository",
  PrismaPayStubRepository
);
