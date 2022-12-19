import { Request, Response, NextFunction } from "express";

import { verifyToken } from "./jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers["authorization"];
  console.log(auth);
  if (auth && auth.startsWith("Bearer")) {
    const token = auth.slice(7);
    console.log("----------------------------------", token);
    try {
      const tokenData = verifyToken(token);
      req.body.tokenData = tokenData;
      next();
    } catch (error) {
      res.status(401).send({ error: "JWT expired" });
    }
  } else {
    //Forbidden
    res.sendStatus(403);
  }
};
