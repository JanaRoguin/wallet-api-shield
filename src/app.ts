import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import walletRoutes from "./routes/walletRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/signin", authRoutes);
app.use("/wallets", walletRoutes);

export default app;
