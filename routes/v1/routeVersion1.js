const express = require("express")

const authRoutes = require("./authRoutes")
const jobRoutes = require("./jobRoutes")
const { checkToken } = require('../../controllers/authController');

const routes = express.Router()

// Auth Routes (Login, and SignIn)
routes.use("/auth", authRoutes)

// JOB Routes
routes.use("/job", checkToken, jobRoutes)

module.exports = routes;
