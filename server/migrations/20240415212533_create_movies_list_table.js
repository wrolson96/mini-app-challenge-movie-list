/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("movie_data", (table) => {
    table.increments("id").primary();
    table.string("title", 50).notNullable();
    table.boolean("watched").notNullable().defaultTo("false");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("movie_data");
};
