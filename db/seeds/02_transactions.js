exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("transactions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("transactions").insert([
        {
          amount: "3",
          type: "Purchased Suns Tickets",
          business_name: "Big Baller Brand",
          user_id: 1
        },
        {
          amount: "15",
          type: "Pearl Jam Posters",
          business_name: "Pearl Jam Fan Club",
          user_id: 2
        },
        {
          amount: "5",
          type: "Pounds of Gold",
          business_name: "Alaska Tours",
          user_id: 3
        }
      ]);
    });
};
