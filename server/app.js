const express = require("express");
const app = express();
const PORT = 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/movies", (req, res) => {
  knex("movie_data")
    .select("*")
    .orderBy("title")
    .then((data) => res.status(200).json(data));
});

app.get("/search/:query", (req, res) => {
  let query = req.params.query;
  knex("movie_data")
    .select("*")
    .whereILike("title", `%${query}%`)
    .then((data) => {
      res.status(200).json(data);
    });
});

app.get("/movies/watched/:watch", (req, res) => {
  let watch = req.params.watch;
  knex("movie_data")
    .select("*")
    .where("watched", watch)
    .then((data) => res.status(200).json(data));
});

app.post("/movies", (req, res) => {
  let movie_addition = {
    title: req.body.title,
  };
  console.log(movie_addition);
  knex("movie_data")
    .insert(movie_addition)
    .then(() => {
      res.status(201).send("Movie added successfully");
    });
});

app.patch("/movies/:id", (req, res) => {
  let watched_modification = {
    watched: req.body.watched,
  };
  // console.log(watched_modification);
  knex("movie_data")
    .where("id", req.params.id)
    .update(watched_modification)
    .then(() => {
      res.status(200).send("movie successfully updated");
    })
    .catch(() => {
      res.status(404).send("movie failed to update");
    });
});

app.delete("/delete/:id", (req, res) => {
  knex("movie_data")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.status(204).send("movie successfully deleted");
    })
    .catch(() => {
      res.status(404).send("movie failed to delete");
    });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
