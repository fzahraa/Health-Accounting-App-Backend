import crypto from 'crypto';
import 'dotenv/config';

const { KEY, IV } = process.env;

const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = Buffer.from(KEY!, 'hex');
const iv = Buffer.from(IV!, 'hex');

function encrypt(data: string, _key?: Buffer, _iv?: Buffer) {
  if (!data) return '';
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(_key ?? key),
    _iv ?? iv,
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(encryptedData?: string) {
  if (!encryptedData) return '';
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function sign(params: any, secretKey: string): string {
  const arrayParams: { key: string; value: any }[] = [];
  Object.entries(params).forEach(([key, value]) =>
    arrayParams.push({ key: key, value: value }),
  );
  const sorted = arrayParams.sort((a, b) => (a.key > b.key ? 1 : -1));
  const signatureString =
    sorted.map((x) => x.key + '=' + x.value).join('|') + secretKey;

  const signature = crypto
    .createHash('sha256')
    .update(signatureString)
    .digest('hex');

  return signature;
}

export { encrypt, decrypt, sign };
