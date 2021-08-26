const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views and partial location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Abhishek Sharma",
		home: "Weather is 31 .",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Abhishek Sharma",
		help: "This is the help page.",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Abhishek",
		errorMessage: "Help Page is not found.",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Abhishek Sharma",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Please Enter the Location.",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({
						error,
					});
				}

				res.send({
					location,
					forecast: forecastData,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/product", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search item.",
		});
	}
	console.log(req.query.search);
	res.send({
		product: [],
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Abhishek",
		errorMessage: "Page not found.",
	});
});

app.listen(3000, () => {
	console.log("Server is up on the port 3000");
});
