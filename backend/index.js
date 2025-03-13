// get env
require("dotenv").config();
const cors = require("cors");

const { app, express } = require("./src/constants.js");

// routes
const FoundItemsRoutes = require("./src/routers/FoundItemsRoutes.js");
const LostItemsRoutes = require("./src/routers/LostItemsRoutes.js");
const UsersRoutes = require("./src/routers/UsersRoutes.js");
const MatchRoutes = require("./src/routers/MatchRoutes.js");

app.use(cors({ origin: "http://localhost:3006", credentials: true }));
app.use(cors());

app.use(express.json());

app.use("/api/found-items", FoundItemsRoutes);
app.use("/api/lost-items", LostItemsRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/match", MatchRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `App is now running, and is listening to port ${process.env.PORT}`
  );
});
