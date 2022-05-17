import express from "express";
import { openRoute } from "./router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(openRoute);

export { app };
