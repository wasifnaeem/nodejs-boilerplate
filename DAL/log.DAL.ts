import { LogSchema } from "./collections/logs.collection";

export class LogDAL {

    constructor() {
    }

    addLog(request_url: string, real_user: string, request_made_by: string, request_status: string, original_data: string, modified_data?: string) {
        return new LogSchema({
            real_user: real_user,
            request_status: request_status,
            request_url: request_url,
            request_made_by: request_made_by,
            original_data: original_data,
            modified_data: modified_data
        }).save()
    }

    getLogs(feeds_per_page: number, page_number: number) {
        if (page_number) {
            let skipDocs: number = (page_number - 1) * feeds_per_page

            return LogSchema.find().sort({ _id: -1 }).skip(skipDocs).limit(feeds_per_page)
                .populate('real_user', {
                    _id: 1,
                    first_name: 1,
                    last_name: 1
                }).populate('request_made_by', {
                    _id: 1,
                    first_name: 1,
                    last_name: 1
                })
        }
        else {
            return LogSchema.find().sort({ _id: -1 }).limit(feeds_per_page)
                .populate('real_user', {
                    _id: 1,
                    first_name: 1,
                    last_name: 1
                }).populate('request_made_by', {
                    _id: 1,
                    first_name: 1,
                    last_name: 1
                })
        }
    }

}