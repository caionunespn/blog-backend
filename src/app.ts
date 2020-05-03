import express, {Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import {databaseConnection} from "./database";

class Server {
  
  public app: Application;
  
  constructor(){
    this.app = express();

    databaseConnection();
    this.config();
  }

  config(){

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cors());

    this.app.use(routes);
  }
}

export default new Server().app;