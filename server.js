require("dotenv").config()
// Modules
const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const jobRoutes = require("./routes/jobRoutes")
const { checkToken } = require('./controllers/authController');
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

// Auth Routes (Login, and SignIn)
app.use("/api/1/auth", authRoutes)

// JOB Routes
app.use("/api/1/job", checkToken, jobRoutes)



sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log("Error: " + err))
