const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "goodreads.db");

let dbConnectionObj = null;

const initailizeDBandServer = async () => {
  try {
    dbConnectionObj = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, (req, res) => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initailizeDBandServer();

app.get("/books/", async (req, res) => {
  const booksFromQuery = `SELECT * FROM book ORDER BY book_id ; `;
  const booksResult = await dbConnectionObj.all(booksFromQuery);
  res.send(booksResult);
});
