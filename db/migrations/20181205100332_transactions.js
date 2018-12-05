exports.up = function(knex, Promise) {
  return knex.schema.createTable("transactions", table => {
    table.increments();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table.integer("amount");
    table.string("type");
    table.string("business_name");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("transactions");
};
