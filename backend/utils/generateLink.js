const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

function generateUniqueLink() {
  const uniqueID = uuidv4();
  const hash = crypto.createHash("sha256").update(uniqueID).digest("hex");
  return `${process.env.BASE_URL}/main?v=${hash}`;
}

module.exports = generateUniqueLink;
