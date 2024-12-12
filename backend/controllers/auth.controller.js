import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import { generateToken } from "../utilis/generateToken.js";

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

    // Check if the username is provided
    if (!userName) {
      return res
        .status(400)
        .json({ error: "User Name is Required", status: 400 });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password does not match!", status: 400 });
    }

    // Check if user already exists
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists!", status: 400 });
    }

    // Generate profile pic based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`; // Fixed typo here

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      password: hashPass,
      gender,
      userName,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save user to the database
    await newUser.save();

    // Generate token and respond with user details
    generateToken(newUser._id, res);
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      gender: newUser.gender,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Internal error in SignUp Controller", error);
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

    generateToken(user._id, res);
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
