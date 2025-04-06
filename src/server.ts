import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import mongoose from "mongoose";
const app = express();
const cors = require("cors")

app.use(
  cors({
    origin: "https://glam-luv-frontend-tsma.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
require("dotenv").config();

app.use("/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("homepage");
});
// app.use("/api/products", productRoutes);

// CONFIGURATIONS
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
// DATABASE CONNECTION
const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB server"))
  .catch((err) => console.error("MongoDB connection error", err));

app.listen(PORT, () => {
  console.log("app is running on port 3000");
});
