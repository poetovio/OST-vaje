
exports.up = function(knex, Promise) {
    return knex.schema.createTable('nakupi', (table) => {
        table.increments('id').primary();
        table.string('nakupi');
        table.decimal('znesek');
        table.string('datumNakupa');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('nakupi');
};
