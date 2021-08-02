const express = require("express");

const app = express();

// Parse Server plays nicely with the rest of your web routes
app.get("/", function (req, res) {
  res.status(200).send("Server is live");
});

const port = process.env.PORT || 1337;

app.listen(port, function () {
  console.log("parse-server running on port 1337.");
});
