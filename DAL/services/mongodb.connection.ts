import mongoose, { Mongoose } from "mongoose";
import { WinstonLog } from "../../PL/services/winston-logger.service";

export class MongoDb {

    mongoose: Mongoose
    constructor() {
        this.mongoose = mongoose
    }

    connect(host: string, port: number, database_name: string) {
        mongoose.connect(`mongodb://${host}:${port}/${database_name}`, {
            // mongoose.connect(`${environment.DB_Str}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }, (err) => {
            if (err)
                WinstonLog.error(`Couldn't connect to the database`)
            else
                console.log('Connected with MongoDB database')
        })

        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            WinstonLog.error('Mongoose connection error: ' + err);
        });

        mongoose.connection.on('close', function () {
            WinstonLog.error('Mongoose connection closed')
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            WinstonLog.error('Mongoose has been disconnected');
        });
    }
}

export let MongooseConnectionStatus = new MongoDb().mongoose.connection.readyState