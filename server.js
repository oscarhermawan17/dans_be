require("dotenv").config()
// Modules
const express = require("express")
const cors = require("cors")

const routeVersion1 = require("./routes/v1/routeVersion1")
const { sequelize } = require("./models")

const app = express()

// CORS Function
app.use(express.json())
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)

const PORT = process.env.PORT || 3000

// Routing Version 1
app.use("/api/1", routeVersion1)

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log("Error: " + err))
