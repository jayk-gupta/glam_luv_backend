import express, { Request, Response } from "express";
import productRoutes from "../routes/productRoutes";
import mongoose from "mongoose";
import cors from "cors";

// MongoDB connection
const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(mongoURL);
};

// Initialize express
const app = express();
const corsOptions = {
  origin: "https://glam-luv-frontend.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is working" });
});

// Export handler for serverless
export default async function handler(req: Request, res: Response) {
  await connectDB();
  return app(req, res);
}
