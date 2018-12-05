exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "richard.creeger@gmail.com",
          password: "goSuns"
        },
        {
          email: "leandro@whatever.com",
          password: "PearlJamRocks"
        },
        {
          email: "andyzalit@alaska.com",
          password: "asdf"
        }
      ]);
    });
};
