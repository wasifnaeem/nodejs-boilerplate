import fs from "fs";

export class FileFolderService {

    constructor() {

    }

    static createDirectoryIfNotExist(dirPath: string) {
        !fs.existsSync(dirPath) && fs.mkdirSync(dirPath, { recursive: true })
    }

    static deleteImage(image_url: string) {
        let lastIndexOf = image_url.lastIndexOf('/')
        let fileName = image_url.slice(lastIndexOf)
        fs.unlink(`./assets/images/${fileName}`, err => {
            if (err) console.log(err)
        })
    }

}