import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Internship from "../models/Internship.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Run with `npm run seed` from /backend. Clears and repopulates the
 * internships collection from the seed JSON file - safe to run repeatedly.
 */
const seed = async () => {
  await connectDB();

  const seedPath = path.join(__dirname, "../data/internships.seed.json");
  const internships = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

  await Internship.deleteMany({});
  await Internship.insertMany(internships);

  console.log(`Seeded ${internships.length} internships.`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
