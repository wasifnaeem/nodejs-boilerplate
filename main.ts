import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import path from "path";
import { MongoDb } from "./DAL/services/mongodb.connection";
import { AccountRoutes } from "./PL/account.PL";
import { ExceptionHandlerService } from "./PL/services/exception-handle.service";
import "./PL/services/winston-logger.service";

class Main {

    app: express.Application
    constructor() {
        this.app = express()
        // starting express server
        let port = process.env.PORT || 3000
        this.app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        })

        this.staticDirectories()
        this.middlewares()
        this.routes()

        // connecting to the database
        new MongoDb().connect('localhost', 27017, 'smart_sleeve_db')
    }

    staticDirectories() {
        // setting static folder(s)
        this.app.use('/images', express.static(path.join(`assets/images`)))
        this.app.use(express.static(path.join(`${__dirname}`, `api_document`)))
    }

    middlewares() {
        this.app.use(cors())
        this.app.options('*', cors())

        this.app.use(bodyParser.json({ limit: '5mb' }))
        this.app.use(bodyParser.urlencoded({
            limit: '5mb',
            extended: true
        }));

        // this.logRequest()
        // this.logResponse()
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.sendfile(__dirname + '/api_document/doc.html')
        })

        this.app.use('/account', AccountRoutes)

        // after all the routes, adding this middleware to handle routes-exceptions
        this.app.use(new ExceptionHandlerService().handler)
    }

    logRequest() {
        this.app.use((req, res, next) => {
            console.log('^^^^^^^^^^^^^Start: REQUEST^^^^^^^^^^^^^')
            console.log(req.headers)
            console.log(req.body)
            console.log('^^^^^^^^^^^^^End: REQUEST^^^^^^^^^^^^^')
            next()
        });
    }

    logResponse() {
        this.app.use((req, res, next) => {
            var oldEnd = res.end;
            var chunks = [];

            res.end = function (chunk: any) {
                if (chunk)
                    chunks.push(new Buffer(chunk));

                var body = Buffer.concat(chunks).toString('utf8');
                console.log('************Start: RESPONSE************')
                console.log(req.path);
                console.log(JSON.parse(body))
                console.log('************End: RESPONSE************')

                oldEnd.apply(res, arguments);
            };
            next();
        })
    }

}

export default new Main()