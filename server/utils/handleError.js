import Chalk from "chalk";
import debug from "debug";
const log = debug("app:handleError")

const handleError = (res, status, message) => {
  log(Chalk.redBright(message));
  res.status(status).send(message);
};

export default handleError;
