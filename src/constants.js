const express = require("express");

// const router = express.Router();

const app = express();

const db = require("./db/drizzle/db_connection.js");

const { schema } = require("./db/drizzle/schemas/index.js");

module.exports = { express, app, db, schema };
