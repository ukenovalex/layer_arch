import express, { Express } from "express";
import { Server } from 'http';
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";
import { UserController } from "./users/users.controller";

export class App {

    app: Express;
    server: Server;
    port: number;

    constructor(
        private logger: ILogger,
        private userController: UserController,
        private exceptionFilter: ExceptionFilter) {
            this.app = express();
            this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port)
        this.logger.log("Server is startet by port 8000")
    }
}