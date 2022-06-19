import express from "express";
import cors from "cors";
import path from "path";

import { openRoute } from "./router";
import { userRoutes } from "./modules/user/useCases/routes";
import {
  employeeRoutes,
  employeesRoutes,
} from "./modules/employee/useCases/routes";
import { authRoutes } from "./modules/auth/useCases/routes";
import { ensureAuthenticated } from "./modules/auth/middlewares/ensureAuthenticated";
import { ensureIsAdminUser } from "./modules/auth/middlewares/ensureIsAdminUser";
import { payStubRoutes } from "./modules/pay_stub/useCases/routes";

const app = express();
app.use("/files", express.static(path.resolve(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());

app.use(openRoute);

app.use("/auth", authRoutes);
app.use("/users", ensureAuthenticated, userRoutes);
app.use("/employee", ensureAuthenticated, employeeRoutes);
app.use("/employees", ensureAuthenticated, ensureIsAdminUser, employeesRoutes);
app.use("/pay_stubs", ensureAuthenticated, ensureIsAdminUser, payStubRoutes);

export { app };
