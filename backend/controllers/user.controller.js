import User from "../models/user.models.js";

export const UserRoutes = async (req, res) => {
  try {
    const loggedInUSer = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUSer } }).select(
      "-password"
    );
    return res.status(200).send(filteredUser);
  } catch (error) {
    console.log("Error USER Conteoller :", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};
