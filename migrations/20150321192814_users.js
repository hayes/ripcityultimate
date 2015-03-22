'use strict'

exports.up = function up(knex) {
  return knex.schema.createTable('users', function createTable(table) {
    table.increments('id').primary()
    table.string('name')
    table.string('email').unique()
    table.string('auth_provider')
    table.string('auth_id').index()
    table.string('auth_token')
    table.string('auth_secret')
    table.json('meta')
    table.timestamps()
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable('users')
}
