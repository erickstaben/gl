/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZkZDJhNWU2NTMwZDBiNjM0NGNkNjA3ZmRjNzc1YTAwMTEzNzAzMGVjNDE0YjVjYjhhZGE4ZDk3YWVmNjNlNjBkYjE4YTZiY2VlNzcxYTRkIn0.eyJhdWQiOiIyIiwianRpIjoiZmRkMmE1ZTY1MzBkMGI2MzQ0Y2Q2MDdmZGM3NzVhMDAxMTM3MDMwZWM0MTRiNWNiOGFkYThkOTdhZWY2M2U2MGRiMThhNmJjZWU3NzFhNGQiLCJpYXQiOjE1Njc0NDIzNTgsIm5iZiI6MTU2NzQ0MjM1OCwiZXhwIjoxNTY4NzM4MzU4LCJzdWIiOiI1MiIsInNjb3BlcyI6W119.IfIyWw-D3R5Z6i6CsH25qfD547IfiA5fJhdp8pUSbuy3ZgRk3CCaKH2j6_Uzagz4DWRRqR5A0aM5F5wDAw6arndxuuUR3GtAwrY4TWU-YRpXCVE4xoCDrU1vFymU2fEA_wvT8n0CbSSgBaRDQ7mgcGxaOWuG-VRs8Z4Cmd7DahiQyzTvmU47Z-I-7x6LK_OmZxD1s0vfT2DkAH7P_vFbt2qc-JtCMoSEIAxGg4kHEtww_VBPAkC8-FMj4WJIOJTVmHhcTJ1hRKoe4UcGoDDhg-Py8xi35Dk-FCDlX7eX4BnkxGmYYtxJ_MGisdoi-KpaFtFo9wo6b5r_R5ICMI2v1KiJZ2JukL8ydKmSCYndCMX9quhw1v7RsfTAlz5wqLZEuPjCfGUvk_h_T4gp-3FRwoZLHIn1QoGaKE52UFrc5R_giVSNWcuGPRYdADi5gMRhOswoEOumU3N-degDVqNM07xJXq0WEVV2G-GBpMR9oe-NQ6YbZFkxh620UHbZ8v_8Bsm6gppeq7Ve6HryymvAbyhUb4AruiyXswSc4z1Fgd_JB1HCSp9-FYeD99Hno7Rh3VEh-4Yk9RcYAfWYLiob4-T4XBJeQkqdH8zPzF8Fn2rEJQhPDmuBTO_jDZwNKxw-82FJwb9hudcf2Sua_mhLiK7CwVAPHjGIskScvWIddG8'
const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
