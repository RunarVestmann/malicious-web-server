require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { RequestModel, UserModel } = require("./db");

const PORT = process.env.PORT || 4000;
const publicFilePath = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  RequestModel.create({
    agent: req.headers["user-agent"],
    ip: req.ip,
  });
  res.sendFile(`${publicFilePath}/index.html`);
});

app.use(express.static(publicFilePath));

app.get("/requests", async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/requests", async (req, res) => {
  console.log("request POST");
});

// Used for debugging/developmental purposes
app.delete("/requests", async (req, res) => {
  RequestModel.deleteMany();
  res.status(204).send();
});

app.get("/users", async (req, res) => {
  try {
    const requests = await UserModel.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/users", async (req, res) => {
  UserModel.create({
    ...req.body,
    ip: req.ip,
  });
  res.status(201).send();
});

app.use((req, res) =>
  res
    .status(404)
    .json({ message: `Resource for ${req.method} ${req.url} was not found` })
);
app.listen(PORT, () =>
  console.log(`Server has started and is listening on port ${PORT}`)
);
