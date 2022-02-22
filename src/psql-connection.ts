const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "00000",
  port: 5432,
})

const checkTableQuery = pool.query(`
CREATE TABLE IF NOT EXISTS tasks2
(
    Id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    date VARCHAR(100)
   
);`)

export default pool