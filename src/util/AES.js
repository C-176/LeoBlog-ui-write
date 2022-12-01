import {AES, enc, mode, pad} from 'crypto-js';

// 加密密钥（长度必须是 16 的整数倍，此处为 32 位）
const secretKey = '5405fj4j132lj56j13k25jlkj6123j4j';
// 偏移量
const iv = 'solution';


/**
 * ASE加密
 * @description 使用加密秘钥，对 需要加密的参数 进行加密
 * @param {string} word - 需要加密的参数
 * @param {string} key - 加密密钥（长度必须是 16 的整数倍）
 * @param {string} offset - 偏移量
 */
export function encode(word, key = secretKey, offset = iv) {
    // 未加密的参数 - 从 UTF-8编码 解析出原始字符串
    const wordUTF8 = enc.Utf8.parse(word);
    // 密钥 - 从 UTF-8编码 解析出原始字符串
    const keyUTF8 = enc.Utf8.parse(key);
    // 偏移量（在此公司内是固定的） - 从 UTF-8编码 解析出原始字符串
    const offsetUTF8 = enc.Utf8.parse(offset);

    // 补充
    // 把字符串转成 UTF-8编码 —— enc.Utf8.stringify(word);

    const encrypted = AES.encrypt(wordUTF8, keyUTF8, {
        iv: offsetUTF8,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return encrypted.toString();
}


/**
 * ASE解密
 * @description 使用加密秘钥，对 需要解密的参数 进行解密
 * @param {string} encryptedWord - 需要解密的参数
 * @param {string} key - 加密密钥（长度必须是 16 的整数倍）
 * @param {string} offset - 偏移量
 */
export function decode(encryptedWord, key = secretKey, offset = iv) {
    // 密钥 - 从 UTF-8编码 解析出原始字符串
    const keyUTF8 = enc.Utf8.parse(key);
    // 偏移量（在此公司内是固定的） - 从 UTF-8编码 解析出原始字符串
    const offsetUTF8 = enc.Utf8.parse(offset);

    const bytes = AES.decrypt(encryptedWord, keyUTF8, {
        iv: offsetUTF8,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return bytes.toString(enc.Utf8);
}