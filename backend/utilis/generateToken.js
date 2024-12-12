import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRETE_KEY, {
    expiresIn: "15d",
  });

  return res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // samesite: "strict",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "development",
  });
  // return res.status(200).json({ message: `Token generated and cookie set` });
};
