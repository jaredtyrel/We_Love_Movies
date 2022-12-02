if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(cors());
app.use(express.json());

const router = express.Router()
router.get("/", cors(), (req, res) => {
    res.json({ message: "Welcome! You can access the data using these routes: /movies, /movies/:moviesId, /reviews, /reviews/:reviewId, /theaters, /movies/:movieId/reviews, /movies/:movieId/reviews/:reviewId" })
})

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;