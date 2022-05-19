import express from "express";
import { openRoute } from "./router";
import cors from "cors";
import { userRoutes } from "./modules/user/useCases/routes";
import { employeesRoutes } from "./modules/employee/useCases/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(openRoute);
app.use("/users", userRoutes);
app.use("/employees", employeesRoutes);

export { app };
