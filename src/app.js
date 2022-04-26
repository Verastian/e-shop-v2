import express from "express";
import routes from "./routes/index.router";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const api = process.env.API_URL;
// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/src/public/uploads",
  express.static(`${__dirname}/src/public/uploads`)
);

app.use(`${api}`, routes);
export default app;
