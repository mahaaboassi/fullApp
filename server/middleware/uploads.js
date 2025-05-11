const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware to set category for the "type" endpoint
const setCategory = (category) => (req, res, next) => {
    req.category = category;
    next();
};

// Ensure upload directory exists
const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Use disk storage for local file saving
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.category || 'default';
        const dirPath = `uploads/${category}/`;
        ensureDirExists(dirPath);
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Common file filter function
const fileFilter = (req, file, callback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        callback(null, true);
    } else {
        callback(new Error('Error: Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

const uploadMulti = multer({ 
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).array("files", 50);

// Return uploaded file info for local storage
const handleLocalUpload = (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        console.warn("No files provided for upload.");
        return next();
    }

    try {
        const category = req.category || 'default';
        const fileInfos = req.files.map(file => ({
            url : `uploads/${category}/file.path`,
            path: file.path,
            originalName: file.originalname,
            category,
            mimeType: file.mimetype,
            size: file.size
        }));

        req.fileInfos = fileInfos;
        next();
    } catch (error) {
        console.error('Local Upload Error:', error);
        res.status(500).json({
            error: 1,
            data: [],
            message: 'File upload failed',
            details: error.message,
            status: 500
        });
    }
};

// Middleware to delete a local file
const deleteLocalFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
    }
};
// Error handler
const handleFileUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const message = err.code === 'LIMIT_FILE_SIZE' ? "File is too large. Maximum size is 5MB." : "Multer error occurred during file upload.";
        return res.status(400).json({ error: 1, message });
    }

    if (err) {
        console.error(err);
        return res.status(500).json({ error: 1, message: "Server error." });
    }

    next();
};

module.exports = {
    upload,
    uploadMulti,
    handleLocalUpload,
    setCategory,
    handleFileUploadError
};