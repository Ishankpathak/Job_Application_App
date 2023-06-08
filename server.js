//*API DOCUMENTATION
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

//*packages import
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

//*security middleware
import helmet from "helmet";
import xss from "xss-clean";
import mongoSaitize from "express-mongo-sanitize";

//*files import
import connectDB from "./config/db.js";
//*routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobsRoute.js";

//config dotenv
dotenv.config();

//mongodb connection
connectDB();

//*Swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application ",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSaitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

//PORT
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Portal</h1>");
});

app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} mode on Port no ${PORT}`
      .bgCyan.yellow
  );
});
