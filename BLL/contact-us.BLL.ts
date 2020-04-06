import { IContactUsModel } from "../interfaces/contact-us..model";
import { ProfileDAL } from "../DAL/profile.DAL";
import { ApiResponse } from "../interfaces/response.model";
import { EmailService } from "../PL/services/email.service";
import { CommonError } from "../services/common-errors.service";

export class ContactUsBLL {

    constructor() {

    }

    async sendMessage(contact: IContactUsModel) {
        let user = await new ProfileDAL().getProfileInfo(contact.sender_id)
        let response: ApiResponse<any>

        if (user) {
            contact.sender_email = user.email
            contact.sender_name = user.first_name + ' ' + user.last_name
            
            new EmailService().sendMessageToAdmin(contact)

            response = {
                statusCode: 200,
                statusMessage: `You message has been sent successfully`
            }
        }
        else {
            response = CommonError.NotFound('User not found')
        }

        return response
    }

}