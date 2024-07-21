import express from "express";
import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from "../controller/movie-controller.js";

const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie); // Add update movie route
movieRouter.delete("/:id", deleteMovie); // Add delete movie route
export default movieRouter;