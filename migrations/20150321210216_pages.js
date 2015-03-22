'use strict'

exports.up = function up(knex) {
  return knex.schema.createTable('pages', function createTable(table) {
    table.increments('id').primary()
    table.string('title')
    table.string('slug').unique()
    table.text('body')
    table.integer('author_id').references('id').inTable('users')
    table.timestamps()
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable('pages')
}
