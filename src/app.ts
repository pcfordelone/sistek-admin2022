import express from "express";
import { openRoute } from "./router";
import cors from "cors";
import { userRoutes } from "./modules/user/useCases/routes";
import { employeesRoutes } from "./modules/employee/useCases/routes";
import { authRoutes } from "./modules/auth/useCases/routes";
import { ensureAuthenticated } from "./modules/auth/middlewares/ensureAuthenticated";
import { ensureIsAdminUser } from "./modules/auth/middlewares/ensureIsAdminUser";

const app = express();

app.use(cors());
app.use(express.json());

app.use(openRoute);
app.use("/auth", authRoutes);
app.use("/users", ensureAuthenticated, ensureIsAdminUser, userRoutes);
app.use("/employees", ensureAuthenticated, ensureIsAdminUser, employeesRoutes);

export { app };
