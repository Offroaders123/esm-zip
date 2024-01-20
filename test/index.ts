import { readFile } from "node:fs/promises";

const demo = new URL("./demo.zip",import.meta.url);

const buffer = await readFile(demo);
console.log(buffer);