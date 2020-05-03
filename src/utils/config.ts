import * as dotenv from "dotenv";

dotenv.config();

let path;

switch(process.env.NODE_ENV) {
  case "production":
    path = `${__dirname}/../../.env`;
    break;
  case "development":
    path = `${__dirname}/../../.env.dev`;
    break;
  default: 
    path = `${__dirname}/../../.env.dev`;
    break;
}

dotenv.config({ path });

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const APP_SECRET = process.env.APP_SECRET;