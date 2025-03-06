import multer from 'multer';
import { supabase } from '../utils/supabase.js';
import AppError from '../utils/AppError.js';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB file size limit
    },
    fileFilter: (req, file, cb) => {
        // Accept common document formats
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG and PNG files are allowed.'));
        }
    }
});

export const handleFileUpload = (fieldName) => {
    return [
        upload.single(fieldName),
        async (req, res, next) => {
            try {
                if (!req.file) {
                    throw new AppError("No file uploaded", 400)
                }


                // Generate filepath
                const filePath = `files/${req.file.originalname}-${Date.now()}`;
                const { data, error } = await supabase
                    .storage
                    .from('assignment')
                    .upload(filePath, req.file.buffer, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (error) {
                    throw new AppError(error.message,error.statusCode)
                }

                // Add filepath to request object for next middleware/controller
                req.filePath = filePath;
                req.fileBuffer = req.file.buffer;
                req.fileData = data
                next();
            } catch (error) {
                return next(error)
            }
        }
    ];
};

