import {Schema, model, Document, Model} from "mongoose";
import {IUser} from "./user.model";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  publishedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

interface IPostSchema extends Document {
  title: string;
  content: string;
}

export interface IPost extends IPostSchema {
  publishedBy: IUser["_id"];
}

export interface IPost_populated extends IPostSchema {
  publishedBy: IUser
}

PostSchema.statics.findAllWithPublishers = async function () {
  return this.find().populate("publishedBy").exec();
}

PostSchema.statics.findMyPublisher = async function (id: string) {
  return this.findById(id).populate("publishedBy").exec();
}

export interface IPostModel extends Model<IPost> {
  findMyPublisher(id: string): Promise<IPost_populated>,
  findAllWithPublishers(): Promise<IPost_populated[]>
}

export default model<IPost, IPostModel>("Post", PostSchema);