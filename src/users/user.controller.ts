import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import IUserController from "./user.interface";
import 'reflect-metadata';


@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {path: '/login', method: 'post', func: this.login},
            {path: '/register', method: 'post', func: this.register},
        ]);
    }

    getRouter(): Router {return this.router}
    
    login(req: Request, res: Response) {
        this.ok(res, {data: 'login'});
        this.loggerService.log('Login');
    }

    register(req: Request, res: Response, next: NextFunction) {
        // this.send(res, 201, {data: 'register'});
        // this.logger.log('Register');
        next(new HTTPError(422, "Error field", "Register User"))
    }
}