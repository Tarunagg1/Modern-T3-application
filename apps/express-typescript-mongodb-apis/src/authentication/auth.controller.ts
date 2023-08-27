import userModel from "../user/user.model";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import CreateUserDTO from "user/user.dto";
import AuthenticationService from './auth.service';
import LoginDTO from "./login.dto";
import * as bcrypt from "bcrypt";
import WrongCredentialsException from "../exceptions/wrong.credentials.exception";
import TokenData from "../interfaces/token.interface";
import * as jwt from "jsonwebtoken";
import User from "../user/user.interface";

class AuthenticationController implements Controller {
    public path = "/auth";
    public router = Router();
    private user = userModel;
    public authenticationService = new AuthenticationService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }

    private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LoginDTO = request.body;

        try {
            const user = await this.user.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = await bcrypt.compare(
                    logInData.password,
                    user.get("password", null, { getters: false })
                );
                if (isPasswordMatching) {
                    const tokenData = this.createToken(user);
                    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                    response.send(user);
                } else {
                    next(new WrongCredentialsException());
                }
            } else {
                next(new WrongCredentialsException());
            }
        } catch (error) {
            next(error);
        }
    }


    private registration = async (request: Request, response: Response, next: NextFunction) => {
        const userData: CreateUserDTO = request.body;
        try {
            const { user } = await this.authenticationService.register(userData);
            response.send(user);
        } catch (error) {
            next(error);
        }
    }


    private loggingOut = async (request: Request, response: Response, next: NextFunction) => {
        response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
        response.send(200);
    }


    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.SECRET;
        const dataStoredInToken: any = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}

export default AuthenticationController;