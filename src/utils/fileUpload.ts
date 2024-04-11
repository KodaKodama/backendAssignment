import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, "content"); // Set the destination folder for storing files
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        console.log('inside storage');
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames for uploaded files
    }
});

// Multer file upload middleware configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000 * 100 }, // Set file size limit (in bytes)
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        console.log('inside upload');
        const fileTypes = /jpg|png|mp4|gif/;
        console.log('file', file.mimetype, file.originalname);
        if (fileTypes.test(path.extname(file.originalname).toLowerCase())) {
            return cb(null, true); // Accept the file if its extension matches allowed file types
        } else {
            return cb(new Error('Invalid file type'));
        }
    }
}).single('image'); // Define the field name for file upload

export default upload;
