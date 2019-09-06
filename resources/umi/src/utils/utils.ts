/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg5MDI3N'+
'zViMGY5YzM1NWQ5YmI5MTBiZTdjYWYyOTQ2MGU5ZWE1NjhiYzRlZDJmYmRkYTIzNjNlNjZhZThmZGM3MjViOTQ5Zm'+
'I5YzQxY2M1In0.eyJhdWQiOiIyIiwianRpIjoiODkwMjc3NWIwZjljMzU1ZDliYjkxMGJlN2NhZjI5NDYwZTllYTU'+
'2OGJjNGVkMmZiZGRhMjM2M2U2NmFlOGZkYzcyNWI5NDlmYjljNDFjYzUiLCJpYXQiOjE1Njc3MDIyMzUsIm5iZiI6'+
'MTU2NzcwMjIzNSwiZXhwIjoxNTY4OTk4MjM0LCJzdWIiOiI1MiIsInNjb3BlcyI6W119.Jpndpq6IaRi0_IepQ3Ih'+
'1Iv5G7VluTLneqI1qPaxSrGFZGb49o69qmAj0hK6oNwIpl2-NbCbS_7a4QsRIwZaEQ959bQKkCaPbAnwwM6H3Fh-1'+
'iwToesaE58ukvoWtogj6sN5UwpXdt-cQr8mcT766i2vVufdILhaNQRLWm-lnBq7LNhrLAvt1ze0D27FHLyWhdhtOZ'+
'pETQJ6qtwNDEEfAZPKolpcKUkxKSM9FJVwaPJS4J0lO1IySc4Rn2gaXrWHAU0HtcU6zHwgMDgt-NBtT2HGr1k0JMh'+
'EDk35CW6pPiOWTqEBOFNhYzabqQZ1av38i6cMO7gwSRaSHjEa2w8ilrU32NTMXlB6jU9_WE9f11TAcgSValjFh-4l'+
'LuVFH9SCco9wlkYQhlp9kXzQC9mlaIZHsS61ObUzGIm_ZmsbRMpMI5s9FYYfrYqADghGWrB9w90aRlpHZNWK3E0AO'+
'RtAt0ZSP97SAG8SjIE8doAFoh-dRLiZatTe-dyT5ig6uBr7HfbgN-8r9Azs9PyTYjYQjkKyiNUA1Cu1j0lDqo9llH'+
'KkPlBaA-wAoUykMR-AhB0XO5J6wdwUlS0V8i4vW8s1q5HeMB32z0-LHf_JhAzq6uDQXLcWOY53VHa3JGJeAtCwLET'+'uuPGUWPGRugVpas38d2IFAND3GYAxWWikO_rq5vg';
const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
