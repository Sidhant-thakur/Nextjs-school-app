import { db } from "../../lib/db";

export default function handler(req, res) {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
}
