'use strict'

exports.up = function up(knex) {
  return knex.schema.createTable('settings', function createTable(table) {
    table.increments('id').primary()
    table.string('key').unique().index()
    table.json('value')
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable('settings')
}
