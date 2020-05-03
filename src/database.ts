import mongoose from "mongoose";
import {MONGO_URI} from "./utils/config";

export const databaseConnection = async () => {

  const url: string = MONGO_URI || "";

  return mongoose
    .connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch((error: mongoose.Error) => console.log("Error while trying to connect with database: " + error));
}