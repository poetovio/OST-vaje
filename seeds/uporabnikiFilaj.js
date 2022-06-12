exports.seed = function(knex, Promise) {
    return knex('uporabniki').del()
        .then(function () {
            return knex('uporabniki').insert([
                {
                "id": 1,
                "username": "urban",
                "password": "vizintin",
                "admin": "true"
            },
            {
                "id": 2,
                "username": "alfi",
                "password": "nipic",
                "admin": "false"
            },
            {
                "id": 3,
                "username": "goran",
                "password": "dragic",
                "admin": "false"
            },
            {
                "id": 4,
                "username": "chris",
                "password": "brown",
                "admin": "false"
            }
            ]);
        });
};