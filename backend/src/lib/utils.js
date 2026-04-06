import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
