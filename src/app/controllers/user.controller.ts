import {Request, Response} from "express";
import User, {IUser} from "../models/user.model";

export default {
  async index(req: Request, res: Response){
    const users: IUser[] = await User.find().select("name email bio contacts");

    return res.status(200).json(users);
  },

  async update(req: Request, res: Response) {
    const {userId} = req;

    if(userId !== req.params.id){
      return res.status(400).json({ message: "Permission denied"});
    }

    User.findOne({_id: userId}, async (err, result) => {
      if (err){
        return res.status(500).json({ message: err.message });
      }

      if(result) {
        if(req.body.name){
          result.name = req.body.name;
        }

        if(req.body.email){
          const checkIfEmailAvailable = await User.checkIfEmailIsAvailable(req.body.email);
          if(checkIfEmailAvailable) {
            if(checkIfEmailAvailable.email !== result.email){
              return res.status(400).json({ message: "Email already exists" });
            }else {
              result.email = req.body.email;
            }
          }
        }

        if(req.body.bio) {
          result.bio = req.body.bio;
        }

        if(req.body.contacts) {
          Object.keys(req.body.contacts).map(key => {
            result.contacts.set(key, req.body.contacts[key]);
          });

          console.log(result.contacts);
        }

        await result.save();
        return res.status(200).json(result.toJSON());
      }
    });
  }
}