/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("movie_data").del();
  await knex("movie_data").insert([
    { title: "Mean Girls" },
    { title: "Hackers" },
    { title: "The Grey" },
    { title: "Sunshine" },
    { title: "Ex Machina" },
  ]);
};
