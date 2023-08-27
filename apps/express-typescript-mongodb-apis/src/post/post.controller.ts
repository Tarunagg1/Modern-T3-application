import userModel from "user/user.model";
import Controller from "../interfaces/controller.interface";
import postModel from "./post.model";
import { Request, Response, NextFunction, Router } from "express";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    public user = userModel;
    public post = postModel;

    //   constructor() {
    //     this.initializeRoutes();
    //   }



}

export default PostController;