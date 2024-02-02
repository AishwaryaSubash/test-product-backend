import type { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        async (err: any, user: any) => {
          if (err) {
            res.status(403).json({ status: false, message: "invalid token" });
          }
          next();
        }
      );
    } else {
      res.status(403).json({ status: false, message: "no token" });
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = verifyToken;
