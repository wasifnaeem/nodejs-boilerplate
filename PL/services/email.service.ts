import nodeMailer from "nodemailer";
import { Token } from "../../BLL/services/token.service";
import { environment } from "../../environment/environment";
import { IContactUsModel } from "../../interfaces/contact-us..model";
import { IUserModel } from "../../DAL/document-models/user.model";

interface IMailOptions {
    from: string
    to: string
    cc?: string
    bcc?: string
    subject: string
    text?: string
    html?: string
}

enum MAIL_SENDER {
    from = '"Smart Sleeve" <smart.sleeve.manager@gmail.com>',
    email = 'smart.sleeve.manager@gmail.com'
}

const transportOptions = {
    host: "smtp.google.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: `smart.sleeve.manager@gmail.com`,
        pass: environment.G_PASS
    },
    tls: {
        // when trying from localhost, it rejects the authorization if set to true
        rejectUnauthorized: false
    }
}

export class EmailService {

    constructor() {

    }

    sendPasswordRecoveryMail(user: IUserModel) {
        let token = new Token().create(user._id, user.role, '1h')
        let activationLink = `${environment.clientBaseURL}/reset-password/${token}`

        let mailOptions: IMailOptions = {
            from: MAIL_SENDER.from, // sender address
            to: user.email, // list of receivers
            subject: "Password Recovery", // Subject line
            text: "Here is your text", // plain text body
            html: `<b>Recover your Password</b>
                <br>
                Please click this link to recover your password <br>
                <a href="${activationLink}">${activationLink}</a>
                `
        };

        return this.send(mailOptions)
    }

    // when user sends message using contact-us forms
    sendMessageToAdmin(contact: IContactUsModel) {
        let mailOptions: IMailOptions = {
            from: MAIL_SENDER.from, // sender address
            to: `info@bowlistics.pk`, // list of receivers
            bcc: `wasif.naeem786@gmail.com`,
            subject: `${contact.subject}`, // Subject line
            text: "Here is your text", // plain text body
            html: `
                <div>
                <p><b>User details:</b></p>
                <p><b>Name</b>: ${contact.sender_name}</p>
                <p><b>Role</b>: ${contact.sender_role}</p>
                <p><b>Email</b>: ${contact.sender_email}</p>
                <hr>
                <p><b>Message</b></p>
                ${contact.message}
                </div>
                `
        };

        return this.send(mailOptions)
    }

    sendAccountVerificationMail(user: IUserModel) {

        let token = new Token().create(user._id, user.role)
        let activationLink = `${environment.clientBaseURL}/activate-account/${token}`

        let mailOptions: IMailOptions = {
            from: MAIL_SENDER.from, // sender address
            to: user.email, // list of receivers
            subject: "Account Verification", // Subject line
            text: "Here is your text", // plain text body
            html: `Hi <b>${user.first_name} ${user.last_name},</b>
                <br><br>
                Please click this link to verify your account <br>
                <a href="${activationLink}">${activationLink}</a> 
            `
        }

        return this.send(mailOptions)
    }

    private send(mailOptions: IMailOptions) {
        let transporter = nodeMailer.createTransport(transportOptions)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    }

}