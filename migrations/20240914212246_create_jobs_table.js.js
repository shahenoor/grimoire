// 20240914_create_jobs_table.js

export function up(knex) {
    return knex.schema.createTable('jobs', function(table) {
      table.increments('id').primary(); 
      table.string('title').notNullable(); 
      table.string('company').notNullable(); 
      table.string('location').nullable();
      table.text('description'); 
      table.timestamp('applied_at').notNullable();
      table.timestamp('creation_date').notNullable();
      table.timestamp('deadline').nullable();
      table.string('color').notNullable();
      table.integer('salary').nullable();
      table.string('status').defaultTo('wishlist'); 
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
  };
  
  export function down(knex) {
    return knex.schema.dropTable('jobs'); // Rollback: drop the jobs table
  };
  