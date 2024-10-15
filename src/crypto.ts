import { AES, enc } from "crypto-js";

const secretKey = process.env.SECRET_KEY || "new";

export const encryptData = (data: any) => {
  return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (data: any) => {
  try {
    const bytes = AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data:", error);
    return;
  }
};
