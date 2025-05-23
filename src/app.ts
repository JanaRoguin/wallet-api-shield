import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import walletRoutes from "./routes/wallet.routes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/wallets", walletRoutes);

export default app;
