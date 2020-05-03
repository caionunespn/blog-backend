import {Request, Response} from "express";
import User, {IUser} from "../models/user.model";

export default {
  async signup(req: Request, res: Response) {
    const { name, email, password, bio, contacts } = req.body;

    User.findOne({email}, async (err, result) => {

      if(err) {
        return res.status(500).json({ message: err });
      }

      if(result) {
        return res.status(400).json({ message: "User already exits" });
      }

      const user: IUser = await User.create({
        name, email, password, bio, contacts
      });

      return res.status(201).json({...user.toJSON(), token: user.generateToken()});
    });
  },

  async store(req: Request, res: Response) {
    const {email, password} = req.body;

    User.findOne({email}, async (err, result) => {
      if(err){
        return res.status(500).json({ message: err });
      }

      if(result) {

        if(!result.checkPassword(password)) {
          return res.status(401).json({ message: "Wrong password" });
        }

        return res.status(201).json({...result.toJSON(), token: result.generateToken()});
      }
    });
  }
};