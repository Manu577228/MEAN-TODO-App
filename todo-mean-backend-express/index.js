const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const CONNECTION_STRING =
  "mongodb+srv://bnmanubharadwaj:root@cluster0.eeoiefx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASENAME = "MEAN-TODO-APP";
let database;

MongoClient.connect(CONNECTION_STRING, (error, client) => {
  if (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }

  database = client.db(DATABASENAME);
  console.log("Database Connection Successful");

  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});

app.get("/api/todoapp/get-notes", multer().none(), (req, response) => {
  database
    .collection("todoappcollection")
    .find({})
    .toArray((err, res) => {
      response.send(res);
    });
});

app.post("/api/todoapp/add-notes", multer().none(), (req, response) => {
  database.collection("todoappcollection").count({}, function (err, numOfDocs) {
    database.collection("todoappcollection").insertOne({
      id: (numOfDocs + 1).toString(),
      description: req.body.newNotes,
    });
    response.json("Note Added Successfully 😊");
  });
});

app.delete("/api/todoapp/delete-notes", (req, response) => {
  database.collection("todoappcollection").deleteOne({
    id: req.query.id,
  });
  response.json("Note Deleted Successfully 🙁");
});
