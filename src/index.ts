export function readZip(data: Buffer){
  return readLocalFileHeader(data);
}

export interface LocalFileHeader {
  signature: string;
  version: number;
  generalBitFlag: number;
  compressionMethod: number;
  lastModifiedTime: number;
  lastModifiedDate: number;
  crc32: number;
  compressedSize: number;
  uncompressedSize: number;
  fileNameLength: number;
  extraFieldLength: number;
  fileName: string;
  extraField: Buffer;
}

export function readLocalFileHeader(data: Buffer): LocalFileHeader {
  const view = new DataView(data.buffer,data.byteOffset,data.byteLength);

  const signature: string = data.subarray(0,4).toString("utf-8");
  const version: number = view.getUint16(4,true);
  const generalBitFlag: number = view.getUint16(6,true);
  const compressionMethod: number = view.getUint16(8,true);
  const lastModifiedTime: number = view.getUint16(10,true);
  const lastModifiedDate: number = view.getUint16(12,true);
  const crc32: number = view.getUint32(14,true);
  const compressedSize: number = view.getUint32(18,true);
  const uncompressedSize: number = view.getUint32(22,true);
  const fileNameLength: number = view.getUint16(26,true);
  const extraFieldLength: number = view.getUint16(28,true);
  const fileName: string = data.subarray(30,30 + fileNameLength).toString("utf-8");
  const extraField: Buffer = data.subarray(30 + fileNameLength, 30 + fileNameLength + extraFieldLength);

  return { signature, version, generalBitFlag, compressionMethod, lastModifiedTime, lastModifiedDate, crc32, compressedSize, uncompressedSize, fileNameLength, extraFieldLength, fileName, extraField };
}