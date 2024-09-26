export function up(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary(); 
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique(); 
        table.string('password').notNullable(); 
        table.string('avatar').nullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
  };
  
  export function down(knex) {
    return knex.schema.dropTable('users'); // Rollback: drop the users table
  };
  
