import { Request } from "express";
import { diskStorage, StorageEngine } from "multer";
import { FileFolderService } from "../../services/file-folder.service";

class ImageStorage {

    storage: StorageEngine

    constructor() {
        const MIME_TYPE_MAP = {
            'image/png': 'png',
            'image/jpeg': 'jpg',
            'image/jpg': 'jpg'
        }

        // this.multer = multer({
        //     limits: { fieldSize: 2 * 1024 * 1024 },
        //     storage: this.storage
        // })

        this.storage = diskStorage({
            destination: (req, file, callback) => {
                const isValid = MIME_TYPE_MAP[file.mimetype]
                let error = new Error(`Invalid mime type`)
                if (isValid)
                    error = null

                let directory: string = 'assets/images'
                FileFolderService.createDirectoryIfNotExist(directory)
                callback(error, directory)
            },
            filename: (req, file, callback) => {
                let fileName: string = file.originalname.substr(0, file.originalname.lastIndexOf('.'))
                const name = fileName.toLowerCase().split(' ').join('-')
                const ext = MIME_TYPE_MAP[file.mimetype]
                callback(null, `${name}-${Date.now()}.${ext}`)
            }
        })
    }
}

export const imageStorage = new ImageStorage().storage

export const GetStoredImagePath = (req: Request) => {
    let img_url: string = null

    if (req.file) {
        const url: string = `${req.protocol}://${req.get('host')}`
        img_url = url + '/images/' + req.file.filename
    }

    return img_url
}