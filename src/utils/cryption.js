import CryptoJS from 'crypto-js'

// 密钥
const key = CryptoJS.enc.Utf8.parse('WjrOiuHe8P93P6lF')
// 密钥偏移量
const iv = CryptoJS.enc.Utf8.parse('vUvlSJA97VgiqaZ7')
// 解密
export function Decrypt(words) {
  let encryptedHexStr = CryptoJS.enc.Base64.parse(words)
  let cryWord = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(cryWord, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
// 加密
export function Encrypt(words) {
  let cryWord = CryptoJS.enc.Utf8.parse(words)
  let encrypted = CryptoJS.AES.encrypt(cryWord, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
