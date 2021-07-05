const User = require("../models/User");
const passport = require('passport');
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }

  const user = await User.create({
    username,
    email,
    password
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route GET /auth/google
// @desc Authorize user and obtain credentials
// @access Public
exports.googleAuth = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/calendar.events', 'email' ],
  accessType: 'offline'
})


// @route GET /auth/google/redirect
// @desc Redirect user to either a success or failure screen
// @access Public
exports.googleRedirect = passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later',
    failureRedirect: 'temp',
    successRedirect: `${process.env.FRONT_END}/dashboard`
  }), (req, res) => {
    res.status(201)
}

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  let user;
  if(req.user.strategy === 'google') user = await User.findById(req.user._id);
  else user = await User.findById(req.user.id);

  // Send response to let the front end know the user is not logged in
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // alter user model for local user, right now they don't have a unique id besides the mongo id and that creates the issue where we would have to create
  // alternate checks and solutions

  // Before user info is sent to front end we must generate access token using the refresh token stored on the database

  res.status(200).json({
    success: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});
