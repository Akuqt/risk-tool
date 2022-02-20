import fs from "fs";
import yargs from "yargs";
import { fileURLToPath } from "url";
import { hideBin } from "yargs/helpers";
import { join } from "path";

import {
  testTemplate,
  routeTemplate,
  controllerTemplate,
} from "./templates/index.js";

const { n, c, Help } = yargs(hideBin(process.argv)).argv;
const __api = join(fileURLToPath(import.meta.url), "../../../apps/api/");

main(n, c, Help);

/**
 *
 * @param {string} n_ route name
 * @param {string} c_ controller name
 * @param {boolean} Help_ show help
 */
async function main(n_, c_, Help_) {
  if (Help_) {
    console.log("\nUsage:\n");
    console.log("yarn gen:route -n <route_name> -c <controller_name>\n");
    return;
  }

  if (n_ && c_) {
    const __route = join(__api, "/src/routes/", n_ + ".routes.ts");
    const __routeIndex = join(__api, "/src/routes/", "index.routes.ts");
    const __controllerIndex = join(__api, "/src/controllers/", "index.ts");
    const __controller = join(
      __api,
      "/src/controllers/",
      n_ + ".controller.ts",
    );
    const __test = join(__api, "/test", n_ + ".spec.ts");

    const routeFile = fs.createWriteStream(__route);
    const controllerFile = fs.createWriteStream(__controller);
    const testFile = fs.createWriteStream(__test);

    routeFile.write(routeTemplate(c_), (err) => {
      if (err) throw err;
      routeFile.close();
    });

    controllerFile.write(controllerTemplate(c_), (err) => {
      if (err) throw err;
      controllerFile.close();
    });

    testFile.write(testTemplate(n_, c_), (err) => {
      if (err) throw err;
      testFile.close();
    });

    await addToIndexController(n_ + ".controller", __controllerIndex);

    await addToIndexRoute(n_, __routeIndex);

    console.log("done...");
  } else {
    throw new Error("Please provide valid params");
  }
}

/**
 *
 * @param {string} controllerFile controller file name
 * @param {string} path path to index controller
 */
async function addToIndexController(controllerFile, path) {
  const base = await getFileText(path);
  const text = base.concat(`export * from "./${controllerFile}";\n`);
  const file = fs.createWriteStream(path);
  file.write(text, (err) => {
    if (err) throw err;
    file.close();
  });
}

/**
 *
 * @param {string} routeName route name
 * @param {string} path path to index routes
 */
async function addToIndexRoute(routeName, path) {
  const base = await getFileText(path);
  const lines = base.split("\n");
  let i = 0;
  let final = "";
  while (lines[i].startsWith("import")) {
    final += lines[i] + "\n";
    i++;
  }
  final += `import ${routeName} from "./${routeName}.routes";\n`;
  while (!lines[i].startsWith("export")) {
    final += lines[i] + "\n";
    i++;
  }
  final += `router.use("/${routeName}", ${routeName});\n\n${lines[i]}\n`;
  const file = fs.createWriteStream(path);
  file.write(final, (err) => {
    if (err) throw err;
    file.close();
  });
}

/**
 *
 * @param {string} path file path
 * @returns {Promise<string>} file text
 */
async function getFileText(path) {
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
function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    // eslint-disable-next-line no-undef
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
