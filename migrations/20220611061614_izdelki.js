
exports.up = function(knex, Promise) {
  return knex.schema.createTable('izdelki', (table) => {
    table.increments('id').primary();
    table.string('oznaka');
    table.string('ime');
    table.string('opis');
    table.string('src');
    table.integer('kolicina');
    table.decimal('cena');
    table.integer('popust');
  });
};

exports.down = function(knex, Promise) {
  return knew.schema.dropTable('izdelki');
};
