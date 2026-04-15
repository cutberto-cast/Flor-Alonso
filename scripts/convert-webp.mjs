/**
 * convert-webp.mjs
 * Converts all JPG/JPEG/PNG images in public/ramos/ to WebP,
 * then deletes the originals.
 *
 * Run with:  node scripts/convert-webp.mjs
 */

import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAMOS_DIR = join(__dirname, "..", "public", "ramos");

const SUPPORTED = new Set([".jpg", ".jpeg", ".png"]);

const files = await readdir(RAMOS_DIR);
const targets = files.filter((f) => SUPPORTED.has(extname(f).toLowerCase()));

if (targets.length === 0) {
  console.log("No images to convert — everything may already be WebP.");
  process.exit(0);
}

console.log(`Found ${targets.length} image(s) to convert:\n`);

for (const file of targets) {
  const inputPath  = join(RAMOS_DIR, file);
  const outName    = basename(file, extname(file)) + ".webp";
  const outputPath = join(RAMOS_DIR, outName);

  try {
    await sharp(inputPath)
      .webp({ quality: 82 })
      .toFile(outputPath);

    await unlink(inputPath);
    console.log(`  ✓  ${file}  →  ${outName}`);
  } catch (err) {
    console.error(`  ✗  ${file}  —  ${err.message}`);
  }
}

console.log("\nDone. All originals deleted.");
