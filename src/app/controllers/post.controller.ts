import { Request, Response } from "express";
import Post, {IPost_populated} from "../models/post.model";

export default {
  async index(req: Request, res: Response) {
    const posts: IPost_populated[] = await Post.findAllWithPublishers();

    return res.status(200).json(posts);
  },

  async store(req: Request, res: Response) {
    const {userId} = req;
    const {title, content} = req.body;

    try {

      const newPost = await Post.create({
        title,
        content,
        publishedBy: userId
      });
  
      const postPopulated = await Post.findMyPublisher(newPost._id);

      return res.status(201).json(postPopulated);

    } catch ( err ) {
      return res.status(500).json({ message: err.message });
    }
  }
};