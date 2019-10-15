/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => false;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYxYWJjMDYyNzJiZGFmNjcwZWQ0OGY5ZTAxNDE3NWJiMmQ0NWY3ZDI2MjBlNjQxZjFlZGUyOThiNGE1MGUyOTIzYjExMjVkY2FkYjUzN2FjIn0.eyJhdWQiOiIyIiwianRpIjoiNjFhYmMwNjI3MmJkYWY2NzBlZDQ4ZjllMDE0MTc1YmIyZDQ1ZjdkMjYyMGU2NDFmMWVkZTI5OGI0YTUwZTI5MjNiMTEyNWRjYWRiNTM3YWMiLCJpYXQiOjE1NjgxMjM4ODksIm5iZiI6MTU2ODEyMzg4OSwiZXhwIjoxNTY5NDE5ODg5LCJzdWIiOiI1MiIsInNjb3BlcyI6W119.M_9PGNdkl9xMBGJ_9E2tOos66urkVvRXehWo2lEDAVG630zER_C0SBS0QEyfODs9CbwqzQcxn6c0lEfELFZvGjynvqwgCgF2O4YY6-UfrjkjQPwovnKQjGFMSsu4J7HJjmujsNHK6XuO2SgmFaj1FgNzUUyGpmxrk_7a5XEpxr5faahowNETSrtEgskYLzVdgvlSFYk-scdHp36YMHxAV81BWjQNLrm75ppZiljTLo0ObbeaD4P5Aw-f9aixwCxsYzTXE0AxWEQ1wC8UZGBjPs79ujJqPvENISoikus473BQqtzLef1YPpDSYd92Fe5B_6uYmU2sLYrIeCSovTEpKQDSiQrcuhJD71Ct68PVkbYA__AL6m3s356nNr0AdOp7ERiMJfT5EzNJ2mr5v9jGHEOu0uJRFIIH4xJ5H-XGNfm4zVrdtYXtjPuq2lohshQ3WPuCol3KJ3pRkJrymdL2jFKrd2yZCh2xvJaBS1Qly_W3WY3QA_codBOQJDZbYPWdvfXdJlpyOpnAoOB0ijDvPjnK9XiuEMKSKIOR5gBJq9OFA11UYPpM7IrgOhElOBslPVmM1d3djtfkE78bhyU8SNA4dgM0Inluqmxzne62jMyr3SGnfIy4Q08-OYbhnJQ0A03-vT9a2Ka1CchOA1fll_ykcjCei16vLuKxUvfhNIw'
const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
