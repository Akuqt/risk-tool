import fs from "fs";

/**
 *
 * @param {string} path file path
 * @returns {Promise<string>} file text
 */
export async function getFileText(path) {
  const file = fs.createReadStream(path);
  const text = await streamToString(file);
  file.close();
  return text;
}

/**
 *
 * @param {fs.ReadStream} stream read stream
 * @returns {Promise<string>} stream text representation
 */
export function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    // eslint-disable-next-line no-undef
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

/**
 *
 * @param {string} text input
 * @returns {string} Capitalized text
 */
export function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1, text.length);
}
