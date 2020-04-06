export class GeneralServiceDAL {

    static getTimeStamp(_id: string) {
        return _id.toString().substring(0, 8)
    }

    static getDateTime(_id: string) {
        return new Date(parseInt(this.getTimeStamp(_id), 16) * 1000)
    }

}