/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhjNzFkZGM3ODhlODBlY2Y5OWNlYjY1YmE4OGUyNGM3MWEyNjg0ZjhjYjgyMjFhZmY4NzgyMDg0M2EwMzZhMTA0ZWRjYjM3NmE2Y2QwNjllIn0.eyJhdWQiOiIyIiwianRpIjoiOGM3MWRkYzc4OGU4MGVjZjk5Y2ViNjViYTg4ZTI0YzcxYTI2ODRmOGNiODIyMWFmZjg3ODIwODQzYTAzNmExMDRlZGNiMzc2YTZjZDA2OWUiLCJpYXQiOjE1Njc1MzA2OTUsIm5iZiI6MTU2NzUzMDY5NSwiZXhwIjoxNTY4ODI2Njk1LCJzdWIiOiI1MiIsInNjb3BlcyI6W119.Nv4MZkfTaYa3xFnRMowM1SsrAtl0AUxXvIB2sMfIh8gdePycgNEe4e8RQzw9rNTVhtntZvppCG1bAj6qsW-ufeNHlp9a7wIC_wn9lk6NnaO9o1mZEdjMuFjyi8KftoZnSK1nWHysx7by24jiHm2O7-FYlc1IpWb7XZU6NfGcbPGaOs7egZA_2ij0GBu_M_wLLFdYwhof0xYuVHHcFgHRHKx8lqW__XaU0_nH-_aGiufIt8-QpxwxN0L3fnyOgV6rChpOJ7Yg1OhgXyKv8VnAf7bBh_f1xCrUBmSNZBgkXEwRfPDZF8YPaEv9hSG6EYdpy1NpNm8hKGHCWPiIIoWXSKQJVMmcy8oTc6gHF5iryThfeZHUplxW_gVDm7zqXneIpJDEn57tImHsk0bzBJ41goQv7MV7BW8PyWLheb8XkRP0oPuZfLoRvpQIpZFS7-t6vV4W3MT0-ZVEceTS4rly9ZyCzuAWmxOQC7aK4ncXSXLMTRE2lC9-4d23jQEwqfgu0Gmr-HKc4Am8XicyEOOV6JgzZ5cRCXVVyiODV9Ss9IA78eoAjEJ0HBBeRqaORNRvITjWAMP4m7It65Ua2qQlH2Flek6hfa4_fcB0kJovjRKUbMkyWsOQnjQOJpnHJQ-2MP2xosQ-peilgy36PucgQbssQHyN5cj0jXt4ArpxFy4'

const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
