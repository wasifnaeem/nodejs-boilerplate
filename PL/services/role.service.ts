import { USER_ROLE } from "../../enums/roles.enum"

export class UserRole {

    static isValid(role: string): boolean {
        switch (USER_ROLE[role]) {
            case USER_ROLE:
                return true

            default:
                return false
        }
    }

}