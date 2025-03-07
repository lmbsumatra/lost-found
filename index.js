// get env
require("dotenv").config();

// db
const db = require("./src/db/drizzle/db_connection.js");

// schema
const { schema } = require("./src/db/drizzle/schemas/index.js");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await db
      .select({ id: schema.usersTable.id })
      .from(schema.usersTable);

    return res
      .status(200)
      .json({ message: "Users retrieved successfully!", users });
  } catch (error) {
    console.error("Select Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `App is now running, and is listening to port ${process.env.PORT}`
  );
});
