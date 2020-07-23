require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const userRoutes = require("./routes/user");
const todoListRoutes = require("./routes/todoList");

const app = express();

require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/todos", todoListRoutes);

db.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Sever is running at ${process.env.PORT}`);
    });
});