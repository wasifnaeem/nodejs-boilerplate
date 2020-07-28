export class ObjectService {

    static isEmpty(object: any) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static RemoveNullOrUndefinedFields(object: any) {
        for (const property in object) {
            if (object[property] == null || object[property] == undefined) {
                delete object[property]
            }
        }
        return object
    }

}