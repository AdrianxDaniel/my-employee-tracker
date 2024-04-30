const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool(
  {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    database: process.env.DB,
    port: process.env.PORT,
  },
  console.log(`Connected to the dwellers_db database.`)
);

module.exports = pool;
