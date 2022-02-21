var express = require("express");
var router = express.Router();

const COLOURS = [
  {
    name: "RED",
    hex: "#FF0000",
  },
  {
    name: "GREEN",
    hex: "#00FF00",
  },
  {
    name: "BLUE",
    hex: "#0000FF",
  },
  {
    name: "BLACK",
    hex: "#000000",
  },
];

const hexToName = {
  "#FF0000": "RED",
  "#00FF00": "GREEN",
  "#0000FF": "BLUE",
  "#000000": "BLACK",
};

/* GET home page. */
router.get("/", function (req, res, next) {
  // random hex code
  // random number 0 - 3
  let index = Math.floor(Math.random() * 4);
  let hex = COLOURS[index]["hex"];

  // random text
  index = Math.floor(Math.random() * 4);
  let name = COLOURS[index]["name"];

  res.render("index", { title: "Stroop Effect", colour: hex, name: name });
});

router.post("/", function (req, res, next) {
  const requestBody = req.body;

  if ("selected" in requestBody) {
    const guess = requestBody["selected"];
    const correct = hexToName[req.cookies["correctColourGuess"]];

    if (guess === correct) {
      res.end(
        "<script>window.alert('Correct');window.location.href='/';</script>"
      );
    } else {
      res.end(
        "<script>window.alert('Incorrect');window.location.href='/';</script>"
      );
    }
  } else {
    res.end(
      "<script>window.alert('Invalid Request');window.location.href='/';</script>"
    );
  }
});

module.exports = router;
