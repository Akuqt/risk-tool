/* eslint-disable no-console */
import fs from "fs";
import yargs from "yargs";
import { getFileText, capitalize } from "s-common";
import { fileURLToPath } from "url";
import { pageTemplate } from "./template/index.js";
import { hideBin } from "yargs/helpers";
import { join } from "path";

const { n, r, d, f, Help } = yargs(hideBin(process.argv)).argv;
const __web = join(fileURLToPath(import.meta.url), "../../../apps/web/");

main(n, r, d, f, Help);

/**
 *
 * @param {string} n_ page name
 * @param {string} r_ route name
 * @param {string} d_ directory
 * @param {boolean} f_ folder
 * @param {boolean} Help_ show help
 */
async function main(n_, r_, d_, f_, Help_) {
  if (Help_) {
    showHelp();
    return;
  }
  if (n_ && r_) {
    const __name = capitalize(n_);
    const __dir = `/src/pages/${d_ ? d_ + "/" : ""}`;
    const __pages = join(__web, __dir + "index.tsx");
    const __route = `${f_ ? __name + "/index.tsx" : __name + ".tsx"}`;
    if (f_) {
      fs.mkdirSync(join(__web, __dir + __name));
    }
    const page = fs.createWriteStream(join(__web, __dir + __route));
    page.write(pageTemplate(__name), (err) => {
      if (err) throw err;
      page.close();
    });
    await addToPages(__pages, __name, r_);
    console.log("done...");
  } else {
    showHelp();
  }
}

function showHelp() {
  console.log("\nUsage:\n");
  console.log(
    "yarn gen:page -n <page_name> -r <route_name> -d <directory> -f\n",
  );
  console.log(
    "-n page name\n-r route name\n-d directory\n-f folder\n--Help show help\n",
  );
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
    if (line.startsWith("export")) {
      i--;
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
