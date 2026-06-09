import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import pdfRoute from "./routes/pdf.route";
import activityRoute from "./routes/activity.route";
import dashboardRoutes from "./routes/dashboard.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/pdfs", pdfRoute);

app.use("/api/activity", activityRoute);

app.use( "/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PDF CRM API Running",
  });
});

export default app;