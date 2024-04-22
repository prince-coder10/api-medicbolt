import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ProductModel from "./models/Products.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://www.medicbolt.com.ng", "https://medicbolt.com.ng"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

// DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

// Middleware to handle preflight OPTIONS requests
app.options("*", cors());

// Add Access-Control-Allow-Origin header for all responses
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://medicbolt.com.ng/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.post("/createProduct", (req, res) => {
  ProductModel.create(req.body)
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.post("/createProduct", (req, res) => {
  ProductModel.create(req.body)
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  ProductModel.find({})
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById({ _id: id })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.put("/updateProduct/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  ProductModel.findByIdAndUpdate({ _id: id }, req.body).then(() =>
    ProductModel.findOne({ _id: id }).then((products) => {
      res.send(products);
    })
  );
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  ProductModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// Search route for product names
app.get("/searchProduct/:query", (req, res) => {
  const query = req.params.query;

  // Use a regular expression to perform a case-insensitive search for product names containing the query
  ProductModel.find({ ProductName: { $regex: query, $options: "i" } })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
