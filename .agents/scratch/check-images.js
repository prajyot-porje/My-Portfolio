const fs = require("fs");
const path = require("path");

const dir = "c:/Users/porje/Coding/Projects/portfolio/public/images/projects";
const files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.endsWith(".png")) {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);

    // PNG dimensions are at offset 16 (width) and 20 (height) as 4-byte big-endian integers
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(
      `${file}: ${width}x${height} (aspect ratio: ${(width / height).toFixed(2)})`,
    );
  }
});
