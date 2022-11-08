let express = require("express");
let bodyParser = require("body-parser");
let app = express();

// Middleware
// Get stylesheets from /public folder
app.use("/public", express.static(__dirname + "/public"));

// Add body parser middleware
app.use("/", bodyParser.urlencoded({ extended: false }));

// Log all request types and IP addresses
app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Get current time in /now path
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// GET requests
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  var message = "Hello json";
  if (process.env["MESSAGE_STYLE"] == "uppercase") {
    message = "HELLO JSON";
  }
  res.json({ message: message });
});

// Echo the word based on user input in path
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

// Get user query from url or post user query using form
app
  .route("/name")
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post((req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
  });

module.exports = app;
