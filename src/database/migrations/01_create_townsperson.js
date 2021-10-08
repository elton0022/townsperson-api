async function up(knex){
    return knex.schema.createTable('townspersons', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('cpf', 11).notNullable();
        table.string('cns').notNullable();
        table.string('email').notNullable();
        table.date('birth_date').notNullable();
        table.string('phone').notNullable();
        table.string('photo').notNullable();
        table.string('status').notNullable();
        table.unique(['cpf', 'cns', 'phone']);
    })
}

async function down(knex){
   return knex.schema.dropTable('townspersons');
}

module.exports ={ up, down };