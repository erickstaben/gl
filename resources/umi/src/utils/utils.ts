/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI0MTQ0MGY3YjA4NzAwMDA0YWVkM2IxNTM2YWRlNTVhNzg1MTc4M2ZlYzE3ZjZkYWVhOWJkNmQ3NzAxYjQyZTNjNWVlOGY1ZDcxNGRkMWQyIn0.eyJhdWQiOiIyIiwianRpIjoiMjQxNDQwZjdiMDg3MDAwMDRhZWQzYjE1MzZhZGU1NWE3ODUxNzgzZmVjMTdmNmRhZWE5YmQ2ZDc3MDFiNDJlM2M1ZWU4ZjVkNzE0ZGQxZDIiLCJpYXQiOjE1Njc0Mjk3MzIsIm5iZiI6MTU2NzQyOTczMiwiZXhwIjoxNTY4NzI1NzMyLCJzdWIiOiI1MiIsInNjb3BlcyI6W119.ZzTDqwltShmjkSAq0-e0GB8bjJmnyOmZTQYDnmsJN6c4llyH1rk2q3hw9Wf4s7k4yUapwaAZuPnLKM7NwkPq1gOIjheM1m0y1omcS3hhW063_QzSljqy3v7XFnHKQcLVpAGZA5vKTHcq893ztqiIAhdBIj8TYgURcCxBp6iQzQGj-ZhvFqM69xVw4y3NmObTafK1-5kvIFQLnRMFwcsxxWx-rde1v4UjRBFX_OuyaCJ-ZRmA3QlaukfWfb6HZcNexSbFfPIzn-K46RaNO7V1qS0sgfm9latHYRPPu52QxubnVPAc_42CUM-XHGzynrFZX6Sxns1yEeXbehgI5y1zyjPhPTy32b6z4pU6PycSVN40Z07AaEnkqHTrhLEURgcTUlkgOpiGGIKM2CxVb3KT1RSh3JbTFyBCqK_BWcLPV3DAKYwTxODrGID4iUfI9X6W7QOrSm5O1-nD4AKbXUJwmHNBPkmCJ9u1XBQwm9J35AgMQ5IO2aleINKSFHco0f42LAXB1o-LDiFwDW7ezvYN_nHTKhM18LCHmjz-IZJZsxs58rQkM3hhUQ690X8yy7yJYs9tb9Z7b9znXJRl74Z_xPLf6rVeBeeH8ymHcodT_c0mLnVDQ8haxibGqnVPEFhIULYm42UJ6yonnWCjCEuBQJL1BN82j7HKtarTuli7eIU'

const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
