import fs from "fs";
import crypto from "crypto";

const key = crypto.randomBytes(16); 
fs.writeFileSync("public/hsl/sample/enc.key", key);

console.log("public/hsl/sample/enc.key");
