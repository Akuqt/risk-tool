import fs from "fs";
import yargs from "yargs";
import { getFileText, capitalize } from "s-common";
import { fileURLToPath } from "url";
import { pageTemplate } from "./template/index.js";
import { hideBin } from "yargs/helpers";
import { join } from "path";

const { n, r, Help } = yargs(hideBin(process.argv)).argv;
const __web = join(fileURLToPath(import.meta.url), "../../../apps/web/");

main(n, r, Help);

/**
 *
 * @param {string} n_ page name
 * @param {string} r_ route name
 * @param {boolean} Help_ show help
 */
async function main(n_, r_, Help_) {
  if (Help_) {
    console.log("\nUsage:\n");
    console.log("yarn gen:route -n <page_name> -r <route_name>\n");
    return;
  }

  if (n_ && r_) {
    const __name = capitalize(n_);
    const __pages = join(__web, "/src/pages/index.tsx");
    const page = fs.createWriteStream(join(__web, `/src/pages/${__name}.tsx`));

    page.write(pageTemplate(__name), (err) => {
      if (err) throw err;
      page.close();
    });

    await addToPages(__pages, __name, r_);

    console.log("done...");
  } else {
    throw new Error("Please provide valid params");
  }
}

/**
 *
 * @param {string} path path to pages
 * @param {string} name page name
 * @param {string} route page route
 */
async function addToPages(path, name, route) {
  const base = await getFileText(path);
  const lines = base.split("\n");
  let i = 0;
  let final = "";
  for (const line of lines) {
    if (!line.startsWith("import")) {
      break;
    }
    final += line + "\n";
    i++;
  }
  final += `import { ${name} } from "./${name}";\n`;
  for (let j = i; j < lines.length; j++) {
    // eslint-disable-next-line quotes
    if (lines[j].includes('path="*"')) {
      break;
    }
    final += lines[j] + "\n";
    i++;
  }
  const element = `<Route path="/${route}" element={<${name} />} />\n`;
  final += element.padStart(element.length + 8, " ");
  final += lines.slice(i, lines.length).join("\n");

  const file = fs.createWriteStream(path);
  file.write(final, (err) => {
    if (err) throw err;
    file.close();
  });
}
