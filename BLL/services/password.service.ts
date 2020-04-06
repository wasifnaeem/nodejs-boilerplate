import bcryptjs from "bcryptjs";

export class Password {

    constructor() {

    }

    async encrypt(password): Promise<string> {
        let salt = await bcryptjs.genSalt(10)
        let hash = await bcryptjs.hash(password, salt)
        return hash
    }

    async isValid(password: string, hash: string): Promise<boolean> {
        return bcryptjs.compare(password, hash)
    }

}