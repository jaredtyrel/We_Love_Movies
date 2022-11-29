const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {

    const isShowing = req.query.is_showing
    if (isShowing) {
       res.json({ data: await service.listMovie() })
    } else {
        res.json({ data: await service.list() })
    }
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listMovieTheaters(req, res, next) {
    const movieId = req.params.movieId
    res.json({ data: await service.listMovieTheaters(movieId)})
}

async function listMovieReviews(req, res, next) {
    const movieId = req.params.movieId
    const result = await service.listMovieReviews(movieId)
    res.json({ data: result })
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (!movie) {
    next({ status: 404, message: `Movie cannot be found.` });
    return;
  }
  res.locals.movie = movie;
  next();
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listMovieTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMovieTheaters)],
    listMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMovieReviews)],
}