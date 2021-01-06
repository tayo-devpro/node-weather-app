const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const hbs = require("hbs");
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();

// set up heroku port
const port = process.env.PORT || 3001;

// app.use() is a way to customize your folder on express

// the set method tells us which templating engine to use with our express
// the set method takes the key as first param and value as the second param
// hbs is the handlebars used with express

// set up handlebars engine and views location
app.set("view engine", "hbs");
// change the default folder name for hbs from views to the one you specified using viewsPath variable
app.set("views", viewsPath);
// register the partials path
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

// // set up the route for the express app for the root route
// app.get("/", (req, res) => {
//   res.send("<h1>Hello express</h1>");
// });

// setting up route for a hbs view using res.render()
// first param is the name of the hbs view
// second param is an object that contains values to pass along
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "devPro Inc.",
  });
});

// route for about.hbs
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "devPro Inc.",
    profile_name: "Adetayo Joseph A.",
    profile:
      "I am a web designer and developer. I use software tools like html, css, and vanilla Javascript.I also develop mobile apps using React Native and Java for Android.I am a tutor in programming languages like Python, PHP, Laravel, NodeJs, MongoDB, Oracle Database etc.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, geocodeData = {}) => {
    const { latitude, longitude, location } = geocodeData;
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        location,
        latitude,
        longitude,
        forecast: forecastData,
      });
    });
  });
});

// route for help.hbs
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "devPro Inc.",
    message: "Welcome to my web app. Need a help ?",
  });
});

// starting the server up at a particular port

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    error_message: "Help Article not found",
    name: "devPro Inc.",
  });
});

// set up the 404 page

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    error_message: "Page not found",
    name: "devPro Inc.",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
