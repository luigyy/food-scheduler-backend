//TODO: add usage to the response
import express from "express";

import authenticationRoutes from "./routes/authentication";
import getRoutes from "./routes/getRoutes";
import postRoutes from "./routes/postRoutes";
import adminRoutes from "./routes/admin";
import NotFoundHandler from "./middleware/NotFoundHandler";
import errorHandler from "./middleware/errorHandler";
import config from "./config/config";
import logger from "./config/logging";
import mongoConnect from "./config/mongoConnect";
import morgan from "./config/morgan";
import checkRole from "./middleware/checkRole";
import checkToken from "./middleware/checkToken";

const app: express.Application = express();

//connect to database
mongoConnect();

//send formatted JSON
app.set("json spaces", 2);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);

//routes middleware
app.use("/", authenticationRoutes);
app.use("/", getRoutes);
app.use("/", postRoutes);
app.use("/admin", checkToken, checkRole(["ADMIN"]), adminRoutes);

//404 and errorhandler
app.use(errorHandler);
app.use(NotFoundHandler);

app.listen(config.server.port, () => {
  console.clear();
  logger.info(`Listening on port ${config.server.port}`);
});
