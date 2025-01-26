const secretKey = 'a vary confidential secret key';

export async function encryptData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = encoder.encode(secretKey);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedData = encoder.encode(data);

  const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, encodedData);
  const buffer = new Uint8Array(encrypted);
  const combined = new Uint8Array(iv.length + buffer.length);
  combined.set(iv);
  combined.set(buffer, iv.length);
  return btoa(String.fromCharCode(...combined));
}

export async function decryptData(data: string): Promise<string> {
  const decoder = new TextDecoder();
  const key = new TextEncoder().encode(secretKey);
  const combined = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
  const iv = combined.slice(0, 12);
  const encryptedData = combined.slice(12);

  const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, encryptedData);
  return decoder.decode(decrypted);
}
