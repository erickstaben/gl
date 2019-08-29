/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZiYTJlNTAyYjc0ZGY3MjRkMWUxZmZmMWM5MGM2MjkyZjViZmZlMTlmMmUxNTQ0NWZiYWI5ZWIzOGNkMDJhOWRiNGE2MGFlYTM0Njk2MTY4In0.eyJhdWQiOiIyIiwianRpIjoiZmJhMmU1MDJiNzRkZjcyNGQxZTFmZmYxYzkwYzYyOTJmNWJmZmUxOWYyZTE1NDQ1ZmJhYjllYjM4Y2QwMmE5ZGI0YTYwYWVhMzQ2OTYxNjgiLCJpYXQiOjE1NjY0MTM5NDIsIm5iZiI6MTU2NjQxMzk0MiwiZXhwIjoxNTY3NzA5OTQyLCJzdWIiOiI1MiIsInNjb3BlcyI6W119.SzB2sE-KVbr1HPAvhLHbmdOPU4k76Ombe8u1HrYBNUKQyYfCZj1ag27v800lDt9ocQRiSZcjvM5hc3K6fU3R9JKtpOXbBMyhr1-VENryeY18pIbpvIPFd4_UtZFCKxQNUcMNTh2g2i_F8TS-UNVEaB3LUoJHhGOYE_8xo9JwX7V7_L0Vvr7tsiBysxb-PFKp3Ct8vf1rIndWPWIJr3sdxsZrWj789xAJ2dwiRuIiCJIms4aTedzGvaj1n02IJRpgICPp7ADJtrwlGAGEUeFYQT6QyZXjsUG159_k7Mp8pgWRr624Oqaid409KYluTuAW80utwImdd-vBKtZqfz47RdjcpePFO1cpimXt7WRyR-I_UctC_8yUr_uba6tl7QT9BRp5LXlPe5QCaNALnbfEDylDCcvBY8gsWoCAz7zLmhZpoVFrLk9asBrhfk0nUOFU5dlbGtZabqp17MBauNRND5hwU7RU9ypvLwMc8vawcW-uRQNLoWxuMnP8YQxKF82PO6KlUZ3lioS3a-yfvmhEejwYysvfq3_00d3rEPSOAvxm9qrUGpSsaZpkFRP8EGL8FiJLZkhI74l13b-9mqYDW44c1TJ7OCcY5i-X0XDq1PsvhLeTPFccfqbutY8o8VCJGxnXJMDkR5ia4nTCTUA1nZB-yzoH4DFjq6-MRz8FedE';


const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
