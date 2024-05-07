import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import debug from "debug";
let log = debug("app:main");
import compression from "compression";
import logger from "./loggers/loggerAdapter.js";
import connectToDb from "./model/usersAdapter.js";
import helmet from "helmet";
import * as url from "url";
import cors from "cors";
import chalk from "chalk";
import { initialUsers, initialPosts } from "./initialData/initialData.js";
import errorMiddleware from "./middlewares/error.mw.js";
import apiRouter from "./routes/api.router.js";
import envAdapter from "./utils/envAdapter.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let app = express();

envAdapter();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

app.use(cors());
app.use(compression());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});


app.use(errorMiddleware);

app.listen(process.env.PORT || 3001, () => {
  console.log(chalk.green(`Server is Running http://localhost:${process.env.PORT}`));
  log(chalk.green(`Server is Running http://localhost:${process.env.PORT}`));
  connectToDb().then(async () => {
    try {
      let bizId = await initialUsers();
      if (bizId) await initialPosts(bizId);
    } catch (error) {
      log(error)
    }
  });
});
