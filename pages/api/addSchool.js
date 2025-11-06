import multer from "multer";
import { db } from "../../lib/db";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const imageDir = path.join(process.cwd(), "public", "schoolImages");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // ✅ Ensure folder exists right before saving
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }
      cb(null, imageDir);
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });

  const runMiddleware = (req, res, fn) =>
    new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        return resolve(result);
      });
    });

  try {
    await runMiddleware(req, res, upload.single("image"));

    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ error: "Image upload failed" });

    const query =
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [name, address, city, state, contact, image, email_id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "School added successfully" });
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
