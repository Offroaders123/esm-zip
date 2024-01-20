import { readFile } from "node:fs/promises";

const demo = new URL("./demo.zip",import.meta.url);

const buffer = await readFile(demo);
console.log(buffer);

const zip = readZip(buffer);
console.log(zip);

function readZip(data: Buffer){
  const view = new DataView(data.buffer,data.byteOffset,data.byteLength);

  const signature = data.subarray(0,4).toString("utf-8");
  const version = view.getUint16(4,true);
  const generalBitFlag = view.getUint16(6,true);
  const compressionMethod = view.getUint16(8,true);
  const lastModifiedTime = view.getUint16(10,true);
  const lastModifiedDate = view.getUint16(12,true);
  const crc32 = view.getUint32(14,true);
  const compressedSize = view.getUint32(18,true);
  const uncompressedSize = view.getUint32(22,true);

  return { signature, version, generalBitFlag, compressionMethod, lastModifiedTime, lastModifiedDate, crc32, compressedSize, uncompressedSize };
}