// get env
require("dotenv").config();

// db
const db = require("./src/db/drizzle/db.js");

// schema
const { schema } = require("./src/db/drizzle/schemas/schema.js");

const express = require("express");
const app = express();

app.use(express.json()); 

app.post("/insert", async (req, res) => {
  try {
    const { name, age } = req.body; 

    // validate inputs
    if (!name || !age) {
      return res.status(400).json({ error: "Both name and age are required." });
    }

    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ error: "Age must be a positive number." });
    }

    // insert into usertry table
    await db.insert(schema.userTable).values({ name, age });


    return res.status(201).json({ message: "User inserted successfully!" });
  } catch (error) {
    console.error("Insert Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `App is now running, and is listening to port ${process.env.PORT}`
  );
});
