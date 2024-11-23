import express from "express";
import connectDB from "./db/db.js";
import authroutes from "./routes/auth.js";
import blogsRoute from "./routes/blogs.js";
import bodyParser from "body-parser";

// import auth from './middlewares/checktoken.js';

import cors from "cors";

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.use("/api/auth", authroutes);
app.use("/api", blogsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
