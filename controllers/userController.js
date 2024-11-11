// import fs from "fs";
// fs.readdirSync("./modal").forEach((file) => {
//   console.log(file); // This will log all files in the 'modal' folder
// });

import User from "../modal/user.js";
import gUser from "../modal/gUser.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sentience as it is";

// Fetch user profile data
export const getUserProfile = async (req, res) => {
  try {
    console.log(req.body.username);
    let user = await User.findOne({ username: req.body.username });

    if (!user) {
      user = await gUser.findOne({ username: req.body.username });
    }

    res.json({
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update username
export const updateUsername = async (req, res) => {
  const { newusername, username } = req.body;
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user) {
      user = await gUser.findOne({ username: req.body.username });
      //user =
      await gUser.updateOne(
        { username: username },
        {
          $set: {
            username: newusername,
          },
        }
      );
    } else {
      //user =
      await User.updateOne(
        { username: username },
        {
          $set: {
            username: newusername,
          },
        }
      );
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        username: newusername,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    // res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// module.exports = { getUserProfile, updateUsername };
