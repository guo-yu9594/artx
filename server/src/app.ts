import express from "express";
import router from "./router/main";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://artx.vercel.app/", "http://localhost:3000"],
  })
);
app.use(router);

app.get("/", (_, res) => res.send("Hello World"));

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
