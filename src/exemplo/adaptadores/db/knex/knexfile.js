const dotenv = require("dotenv")
dotenv.config({ path: '../../../../../.env' })
module.exports = {
    client: "pg",
    connection: "postgres://postgres:rootpostgresql@localhost:5432/arquitetura",
    migrations: {
        tableName: "knex_migrations",
    },
    pool: {
        min: 2,
        max: 10,
    }
}