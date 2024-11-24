import express from "express";
const router = express.Router();
import User from "../modal/user.js";
import gUser from "../modal/gUser.js";
import jwt from "jsonwebtoken";
import {
  getUserProfile,
  updateUsername,
} from "../controllers/userController.js";

// ! later in env
const JWT_SECRET = "sentience as it is";

// function to check if an email exists in gUser collection
const gUserCheck = async (email) => {
  const GUser = await gUser.findOne({ email });
  if (GUser) {
    return true;
  }
  return false;
};

// function to check whether an email exists in user collection
const userCheck = async (email) => {
  console.log("here");
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

// function to check if username already exists
const usernameCheck = async (username) => {
  const gcheck = await gUser.findOne({ username });
  if (gcheck) {
    return true;
  }
  const user = await User.findOne({ username });
  if (user) {
    return true;
  }
  return false;
};

router.post("/profile", getUserProfile); // Fetch user profile data
router.post("/updateUsername", updateUsername); // Update the username

// Sign Up
router.post("/signup", async (req, res) => {
  const { email, name, username, password } = req.body;

  try {
    // check if already a google user
    if (await gUserCheck(email)) {
      return res
        .status(400)
        .json({ message: "Email is linked to Sign-in with google." });
    }

    // check if already a normal user
    if (await userCheck(email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // username check
    if (await usernameCheck(username)) {
      return res.status(400).json({ message: "Username is in use" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be 7 characters or more" });
    }

    const user = new User({
      name,
      username,
      email,
      password,
    });

    await user.save();
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  try {
    // check if already a google user
    if (await gUserCheck(email)) {
      return res
        .status(400)
        .json({ message: "Email is linked to Sign-in with google." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(user.email);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("this");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// O-auth for google
router.post("/o-auth", async (req, res) => {
  const { email, name, username, password } = req.body;
  // console.log(email);

  try {
    // checking if user already exists in normal db
    if (await userCheck(email)) {
      return res
        .status(400)
        .json({ message: "Email linked to normal sign-in" });
    }

    // Username check
    if (await usernameCheck(username)) {
      return res.status(400).json({ message: "Username is in use" });
    }

    let GUser = await gUser.findOne({ email });
    // if user doesnt exist:
    if (!GUser) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password should be 7 characters or more" });
      }

      GUser = new gUser({
        name,
        username,
        email,
        password,
      });

      await GUser.save();
      const payload = {
        user: {
          id: GUser.id,
          name: GUser.name,
          username: GUser.username,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      });
    }
    // if user exists:
    else {
      console.log(GUser.email);
      const isMatch = await GUser.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: GUser.id,
          name: GUser.name,
          username: GUser.username,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
