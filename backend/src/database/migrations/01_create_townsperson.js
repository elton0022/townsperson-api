async function up(knex){
    return knex.schema.createTable('townsperson', table => {
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
        table.timestamps();
    })
}

async function down(knex){
   return knex.schema.dropTable('townsperson');
}

module.exports ={ up, down };