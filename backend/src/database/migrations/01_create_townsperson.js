async function up(knex){
    return knex.schema.createTable('townsperson', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('cpf').notNullable();
        table.integer('cns').notNullable();
        table.string('email').notNullable();
        table.date('birth_date').notNullable();
        table.string('phone').notNullable();
        table.string('photo').notNullable();
        table.string('status').notNullable();
    })
}

async function down(knex){
   return knex.schema.dropTable('townsperson');
}

module.exports ={ up, down };