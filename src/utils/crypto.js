/** @format */
import CryptoJS from 'crypto-js';
import { getToken } from '@/utils/auth';
 
//加密
function getAesString(data, key, iv) {
  let keyUtf8 = CryptoJS.enc.Hex.parse(key);
  let ivUtf8 = CryptoJS.enc.Hex.parse(iv);
  //这个加密得到 不是字符串
  let encrypted = CryptoJS.AES.encrypt(data, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}
 
export function getDAes(data) {
  const key = 'abcdefgabcdefg12';
  const iv = '';
  let decryptedStr = getAesString(data, key, iv);
  return decryptedStr;
}
 
export function getSortMd5Sign(params) {
  if (typeof params == 'string') {
    return paramsStrSort(params);
  } else if (typeof params == 'object') {
    var arr = [];
    for (var i in params) {
      arr.push(i + '=' + params[i]);
    }
    return paramsStrSort(arr.join('&'));
  }
}
 
function paramsStrSort(paramsStr) {
  var urlStr = paramsStr
    .split('&')
    .sort()
    .join('&');
  var newUrl = urlStr + '&token=' + getToken();
  // console.log(newUrl);
 
  return CryptoJS.MD5(newUrl).toString();
}