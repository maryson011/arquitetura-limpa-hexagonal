exports.up = async function(knex) {
  const existe = await knex.schema.hasTable('transacoes')
  if(existe) return
// knex não é um ORM, é um query build
  return knex.schema.createTable('transacoes', table => {
    table.uuid('id').primary()
    table.string('descricao').notNullable()
    table.decimal('valor').notNullable()
    table.date('vencimento').notNullable().defaultTo(knex.fn.now())
    table.uuid('usuario_id').references('id').inTable('usuarios').notNullable()
    // table.timestamp(true, true)
    // table.timestamp('deleted_at').nullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transacoes')
};
