import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const clientUrl = "http://localhost:3001";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import searchRouter from "./routes/search.js";
import updateRouter from "./routes/update.js";

dotenv.config();

const app = express();
const port = 3001;
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const dbConnectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

console.log("Loading restaurants server... 🧆");

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected! 😍"))
  .catch((error) => {
    console.log("Database is not connected! ☹️");
    console.log(error);
  });

app.use(cors());
app.use(express.json());

app.use("/search", searchRouter);
app.use("/update", updateRouter);

// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
});
