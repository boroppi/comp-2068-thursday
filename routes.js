const express = require("express");
const app = express();

// Import our Page Routes
const pageRoutes = require("./routes/pages");

app.use("/", pageRoutes);

// export our changes
module.exports = app;
