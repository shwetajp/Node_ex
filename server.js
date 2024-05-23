var express = require("express"); // require the express framework
var app = express();
var fs = require("fs"); // require file system object
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // to support JSON-encoded bodies

// Endpoint for the root URL
app.get("/", function (req, res) {
  res.send(
    "Welcome to the REST API demo app! Use /getUsers to get a list of users."
  );
});

// Endpoint to get a list of users
app.get("/getUsers", function (req, res) {
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading user data: ", err);
      res.status(500).send("Error reading user data");
      return;
    }
    console.log(data);
    res.send(data); 
  });
});

var user = {
  user5: {
    id: 5,
    firstname: "Liudmyla",
    lastname: "Nagorna",
    email: "mila@gmail.com",
  },
};

// The addUser endpoint
app.post("/addUser", function (req, res) {
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading user data: ", err);
      res.status(500).send("Error reading user data");
      return;
    }
    data = JSON.parse(data);
    
    
    //  append user variable to list
    data["user5"] = user["user5"];
    console.log(data);
    fs.writeFile(__dirname + "/users.json", JSON.stringify(data), function (err) {
      if (err) {
        console.error("Error writing user data: ", err);
        res.status(500).send("Error writing user data");
        return;
      }
      res.send(JSON.stringify(data)); // use res.send() instead of res.end()
    });
  });
});

// Endpoint to get a single user by id
app.get("/getUser/:id", function (req, res) {
  fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading user data: ", err);
      res.status(500).send("Error reading user data");
      return;
    }
    var users = JSON.parse(data);
    var user = users["user" + req.params.id];
    if (user) {
      console.log(user);
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send("User not found");
    }
  });
});

// Create a server to listen at port 8080
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});

