const express = require("express");
const app = express();

// Import our Page Routes
const pageRoutes = require("./routes/pages");
const blogsRoutes = require("./routes/blogs");
const authorsRoutes = require("./routes/authors");
const sessionsRoutes = require("./routes/sessions");

app.use("/", pageRoutes);
app.use("/blogs", blogsRoutes);
app.use("/authors", authorsRoutes);
app.use("/", sessionsRoutes);

// export our changes
module.exports = app;
