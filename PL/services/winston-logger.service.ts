import winston from "winston";

class WinstonLogger {

    logger: winston.Logger
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
                // new (winston.transports as any).MongoDB({
                //     db: `mongodb://localhost:27017/smart_sleeve_db`
                // })
            ]
        })

        this.logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }))
    }

}

export let WinstonLog = new WinstonLogger().logger