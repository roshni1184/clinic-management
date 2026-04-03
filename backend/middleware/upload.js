// // middleware/upload.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Ensure upload directory exists
// const reportDir = "uploads/reports/";
// if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

// // Storage Engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, reportDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
//   }
// });

// // Allowed file types
// function fileFilter(req, file, cb) {
//   const allowed = [
//     "application/pdf",
//     "image/jpeg",
//     "image/png",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ];

//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Invalid file type"), false);
// }

// const upload = multer({ storage, fileFilter });

// export default upload;



import multer from "multer";
import path from "path";
import fs from "fs";

// Dynamic storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Route ke hisaab se folder decide karo
    let folder = "uploads/others/";

    if (req.baseUrl.includes("gallery")) {
      folder = "uploads/gallery/";
    } else if (req.baseUrl.includes("blog")) {
      folder = "uploads/blog/";
    } else if (req.baseUrl.includes("report")) {
      folder = "uploads/reports/";
    }

    // Folder create if not exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});

// File filter (optional)
function fileFilter(req, file, cb) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;