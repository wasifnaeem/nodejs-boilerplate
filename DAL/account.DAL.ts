import { ACCOUNT_STATUS } from "../enums/account-status.enum";
import { UserSchema } from "./collections/user.collection";
import { IUserModel } from "./document-models/user.model";

export class AccountDAL {

    constructor() {
    }

    activateAccount(user_id: string) {
        return UserSchema.findByIdAndUpdate(user_id, {
            $set: {
                account_status: ACCOUNT_STATUS.active
            }
        }, { new: true })
    }

    signUp(user: IUserModel) {
        return new UserSchema(user).save()
    }

    login(email: string) {
        return UserSchema.findOneAndUpdate({ email: email.toLowerCase() },
            {
                $set: {
                    last_login: new Date()
                }
            },
            {
                select: {
                    first_name: 1,
                    last_name: 1,
                    password: 1,
                    email: 1,
                    role: 1,
                    account_status: 1,
                    profile_image_url: 1,
                }
            })
    }

    recoverPassword(_id: string, newPassword: string) {
        return UserSchema.findByIdAndUpdate(_id, {
            password: newPassword
        }, {
            new: true, select: { _id: 1 }
        })
    }

    getUserByEmail(email: string) {
        return UserSchema.findOne({ email: email })
    }

    getUserById(_id: string) {
        return UserSchema.findById(_id)
    }

    updateAccountStatus(user_id: string, account_status: string) {
        return UserSchema.findByIdAndUpdate(user_id,
            {
                $set: {
                    account_status: account_status
                }
            },
            {
                select: {
                    account_status: 1
                },
                new: true
            })
    }

    deleteAccount(_id: string) {
        return UserSchema.findByIdAndDelete(_id, {
            select: {
                _id: 1
            }
        })
    }

    async isUserExistById(_id: string): Promise<boolean> {
        const user = await UserSchema.findById(_id)

        if (!user)
            return false

        return true
    }

    async isUserExistByEmail(email: string): Promise<boolean> {
        const user = await UserSchema.findOne({ email: email })

        if (!user)
            return false

        return true
    }

}