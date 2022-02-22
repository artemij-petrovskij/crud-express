const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: process.env.PSQL_PORT,
})


export default pool