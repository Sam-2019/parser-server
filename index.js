const express = require("express");
const ParseServer = require("parse-server").ParseServer;
const ParseDashboard = require("parse-dashboard");
const dotenv = require("dotenv");

dotenv.config();
const options = { allowInsecureHTTP: false };
const app = express();

const server = new ParseServer({
  databaseURI: process.env.DB_URI,
  cloud: "./cloud/main.js",
  appId: process.env.APP_ID,
  appName: process.env.APP_NAME,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
});

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: process.env.SERVER_URL,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: process.env.APP_NAME,
      },
    ],
  },
  options
);

// Parse Server plays nicely with the rest of your web routes
app.get("/", function (req, res) {
  res.status(200).send("Server is live");
});

// Serve the Parse API on the /parse URL prefix
app.use("/parse", server);

// make the Parse Server available at /parse
app.use("/dashboard", dashboard);

const port = process.env.PORT || 1337;

app.listen(port, function () {
  console.log("parse-server running on port 1337.");
});
