import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import { generateToken } from "../utilis/generateToken.js";

// SignUp Controller
export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      password,
      confirmPassword,
      gender,
      userName,
      profilePic,
    } = req.body;

    if (!userName) {
      res.status(400).json({ error: "User Name is Required", status: 400 });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ error: "password not matched!!", status: 400 });
    }

    const user = await User.findOne({ userName });

    if (user) {
      res.status(400).json({ error: "User Already exist!!!!", status: 400 });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username${userName}`;

    // Hashpassword

    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);
    const newUser = await User({
      fullName,
      password: hashPass,
      gender,
      userName,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        gender: newUser.gender,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    }
    return res.status(400).json({ error: "Invalid credential" });
  } catch (error) {
    console.log("internal error in SignUp Controller");
    return res.status(500).json({ error: error.message });
  }
};

// SignIn Controller
export const SignIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid Credentails" });
    }
    generateToken(user.id, res);
    res.send(user);
  } catch (error) {
    console.log("Login Controller error :", error);
    res.status(500).json({ error: error.message });
  }
};

// Logout Controller
export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ message: "Logout Successfully!!", status: 200 });
  } catch (error) {
    console.log("Login Controller error :", error);
    res.status(500).json({ error: error.message });
  }
};
