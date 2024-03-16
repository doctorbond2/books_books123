import express from "express";
import { v4 as uuidv4 } from "uuid";
const LOCAL_HOST = 3000;
const JSON_DATA_PATH = "./src/data/authors.json";
const app = express();
import {
  readDataBaseFile,
  writeDataBaseFile,
} from "./utilities/helpers/databaseHelpers.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO GET REQUESTS
app.get("/authors", async (req, res) => {
  const data = await readDataBaseFile(JSON_DATA_PATH);
  if (!data) {
    return res.status(404).json({
      message: "Data not found!",
    });
  }
  res.status(200).json(data);
});

app.post("/authors", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "BAD REQUEST: No body submitted to post request!",
    });
  }
  try {
    const authors = await readDataBaseFile(JSON_DATA_PATH);
    if (!authors || authors.length < 0) {
      return res.status(404).json({
        message: "Data not found, check collection",
      });
    }
    let newAuthor = { id: uuidv4(), ...req.body };

    authors.push(newAuthor);
    await writeDataBaseFile(JSON_DATA_PATH, authors);
    res.json(authors);
  } catch (err) {
    console.log(err);
  }
});
//TODO PUT REQUEST
app.put("/", async (req, res) => {});
//TODO DELETE REQUEST
app.delete("/" + "/:id", async (req, res) => {});
app.listen(LOCAL_HOST, () => {
  console.log("Connected to: " + LOCAL_HOST);
});
