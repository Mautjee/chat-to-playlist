export const decodeFileContent = async (file: File) => {
  const decoder = new TextDecoder("utf-8");

  const buffer = await file.arrayBuffer();
  const decoded = decoder.decode(buffer);
  return decoded;
};
