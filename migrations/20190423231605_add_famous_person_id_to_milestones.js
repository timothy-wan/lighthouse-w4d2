
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.integer('person_id').unsigned();
      table.foreign('person_id').references("id").inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      if(knex.schema.hasColumn('milestones', 'person_id')) { table.dropColumn('person_id'); }
    })
  ])
};
