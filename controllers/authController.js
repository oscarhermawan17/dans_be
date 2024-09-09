// Modules
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { User } = require("../models")

// Login Function
const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" })
  }

  const isMatch = await bcrypt.compare(password, user.dataValues.password)

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  res.json({ token })
}

// SigIn Function
const signIn = async (req, res) => {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });


    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error, failed to create user" });
  }
}

// Is token valid?
const checkToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next()
    } catch (error) {
      res.status(401).json({ message: "Invalid token" })
    }
  } else {
    res.status(401).json({ message: "Token not provided" })
  }
}

module.exports = { login, signIn, checkToken }
