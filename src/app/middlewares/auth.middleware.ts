import {Request, Response, NextFunction} from "express";
import {APP_SECRET} from "../../utils/config";
import jwt from "jsonwebtoken";
import {promisify} from "util";

interface IDecoded{
  id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const {id} = await promisify(jwt.verify)(token, APP_SECRET || "") as IDecoded;

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}