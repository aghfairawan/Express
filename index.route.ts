import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// Get all
app.get("/", (req, res) => {
  res.send("halo dunia ini saya");
});

// Post
app.post("/", (req, res) => {
  res.send("Nyobain post");
});

// Put Method
app.put("/", (req, res) => {
  res.send("Nyobain put");
});

// Delete
app.delete("/", (req, res) => {
  res.send("Nyobain delete");
});

// All method
app.all("/secret", (req, res, next) => {
  console.log("cie masuk secret");
  res.send("rahasia sekali lagi");
  next();
});

// Get
app.get("/barcelona", (req, res) => {
  console.log("get barcelona");
  res.send("body barcelona");
});

// Post
app.post(
  "/barcelona",
  (req, res, next) => {
    console.log("post di barcelona");
    next();
  },
  (req, res) => {
    res.send("post barcelona");
  }
);

// Get by params
app.get("/barcelona/:nama", (req, res) => {
  res.send(`Halo, ${req.params.nama}`);
});

// Not Found
app.get("*", (req, res) => {
  let body = `<h1>Maaf halaman tidak ditemukan</h1>`;
  res.send(body);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
