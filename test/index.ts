import { readFile } from "node:fs/promises";
import { readZip } from "../src/index.js";

const demo = new URL("./demo.zip",import.meta.url);

const buffer = await readFile(demo);
console.log(buffer);

const zip = readZip(buffer);
console.log(zip);