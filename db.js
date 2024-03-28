const { Pool } = require("pg");
require("dotenv").config();
// const pool = new Pool({
//   host: "localhost",
//   port: "5432",
//   user: "postgres",
//   password: "xono",
//   database: "Food",
// });

// Connection string for PostgreSQL database hosted on Render
// const connectionString = process.env.POSTGRESS_URL + "?sslmode=require";

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: { rejectUnauthorized: false },
});
// console.log(process.env.PSQL_USER);
pool.connect((err) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Connect to PostgreSQL successfully!");
});
module.exports = pool;
