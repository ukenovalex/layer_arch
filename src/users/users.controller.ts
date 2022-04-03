import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { LoggerService } from "../logger/logger.service";


export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {path: '/login', method: 'post', func: this.login},
            {path: '/register', method: 'post', func: this.register},
        ]);
    }

    private login(req: Request, res: Response) {
        this.ok(res, {data: 'login'});
        this.logger.log('Login');
    }

    private register(req: Request, res: Response, next: NextFunction) {
        // this.send(res, 201, {data: 'register'});
        // this.logger.log('Register');
        next(new HTTPError(422, "Error field", "Register User"))
    }
}