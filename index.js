// get env
require("dotenv").config();

const { app, express } = require("./src/constants.js");

// routes
const FoundItemsRoutes = require("./src/routers/FoundItemsRoutes.js");
const LostItemsRoutes = require("./src/routers/LostItemsRoutes.js");
const UsersRoutes = require("./src/routers/UsersRoutes.js");

app.use(express.json());

app.use("/api/found-items", FoundItemsRoutes);
app.use("/api/lost-items", LostItemsRoutes);
app.use("/api/users", UsersRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `App is now running, and is listening to port ${process.env.PORT}`
  );
});
