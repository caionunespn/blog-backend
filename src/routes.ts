import {Router} from "express";

import {authMiddleware} from "./app/middlewares/auth.middleware";

import AuthController from "./app/controllers/auth.controller";
import UserController from "./app/controllers/user.controller";
import PostController from "./app/controllers/post.controller";

const routes = Router();

routes.post("/api/users", AuthController.signup);
routes.post("/api/authenticate", AuthController.store);

//AUTHENTICATED ROUTES ONLY

routes.use(authMiddleware);

routes.get("/api/users", UserController.index);
routes.patch("/api/users/:id", UserController.update);

routes.get("/api/posts", PostController.index);
routes.post("/api/posts", PostController.store);

export default routes;