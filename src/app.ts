import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";

import { openRoute } from "./router";
import { userRoutes } from "@user/useCases";
import { employeeRoutes, employeesRoutes } from "@employee/useCases";
import { payStubRoutes } from "@pay_stub/useCases";
import { authRoutes } from "@auth/useCases";
import { ensureAuthenticated } from "@auth/middlewares";
import { ensureIsAdminUser } from "@auth/middlewares";

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
