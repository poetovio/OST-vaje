
exports.up = function(knex, Promise) {
    return knex.schema.createTable('uporabniki', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('password');
        table.string('admin');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('uporabniki');
};
