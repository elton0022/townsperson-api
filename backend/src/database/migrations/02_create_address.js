async function up(knex){
    return knex.schema.createTable('address', table => {
        table.increments('id').primary();
        table.integer('cep').notNullable();
        table.string('public_place').notNullable();
        table.string('complement').notNullable();
        table.string('district').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
        table.string('code_IBGE').notNullable();
        table.integer('townsperson_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('townsperson');
    })
}

async function down(knex){
   return knex.schema.dropTable('address');
}

module.exports ={ up, down };