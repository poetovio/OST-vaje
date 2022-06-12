exports.seed = function(knex, Promise) {
    return knex('uporabniki').del()
        .then(function () {
            return knex('uporabniki').insert([
                {
                "id": 1,
                "username": "urban",
                "password": "vizintin"
            },
            {
                "id": 2,
                "username": "alfi",
                "password": "nipic"
            },
            {
                "id": 3,
                "username": "goran",
                "password": "dragic"
            },
            {
                "id": 4,
                "username": "chris",
                "password": "brown"
            }
            ]);
        });
};