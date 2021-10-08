async function up(knex){
    return knex.schema.createTable('addresses', table => {
        table.increments('id').primary();
        table.string('cep').notNullable();
        table.string('public_place').notNullable();
        table.string('complement');
        table.string('district').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
        table.string('code_IBGE');
        table.bigInteger('townsperson_id')
            .notNullable()
            .references('id')
            .inTable('townspersons')
    })
}

async function down(knex){
   return knex.schema.dropTable('addresses');
}

module.exports ={ up, down };