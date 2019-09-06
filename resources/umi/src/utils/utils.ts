/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);
const __DEV__ = (): boolean => true;
const apiVersion = 'v1';

const __DEV_TOKEN__ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhkOWEwMjM3NGE5ZGZlNzdjOTcwMTk3Y2JhNGFiYTdlY2RhOTgwYTU1MWJhNzMxMGQ0YWUwMDFmYjdjMGNjMTI4MzEwZTRjMTA1M2Y1ODEzIn0.eyJhdWQiOiIyIiwianRpIjoiOGQ5YTAyMzc0YTlkZmU3N2M5NzAxOTdjYmE0YWJhN2VjZGE5ODBhNTUxYmE3MzEwZDRhZTAwMWZiN2MwY2MxMjgzMTBlNGMxMDUzZjU4MTMiLCJpYXQiOjE1Njc3Njc3NjQsIm5iZiI6MTU2Nzc2Nzc2NCwiZXhwIjoxNTY5MDYzNzY0LCJzdWIiOiI1MiIsInNjb3BlcyI6W119.oSI1i5WJxycm0D8Zv80m-RVvAIP8UdNfo-7EvPfkorpjm75g4EZ9oIgh8v0prHGE_HbDetQ_2XCSMOHvum8STmNTXOCPGCuYyYo8ZaXdDqjOrsY61xugHnFm8l3AzbFiwsL43GdkiXUDxmoMtcmRopBhY3U2eGOAsy9GfXnzq11N3cD2FuGj9f-in8LFLVbx_kW5gPcf5RMCe4BC-bSz-EQKfD0Bp-2RWGSmkOdUi_YmkRm_X0ek6fltYlNokyMrntAiBl78z0neieSlJrw7uMssGr8DBKKUD9ASnfmkcNimfUqLzL_mVJc6sW8-6hvnzt9cjPPT9jy5ewm80xblzV68r4GPg3GqwB6Lh-1CmUhlNKHTbqez0j3Uxi3o7z1nERYxCNjJ5t2PRiDL_oLxaN2kCShgt_GAeS6JBJ7mlCHlYjYP0-I1lCJexFFAvDBJWoIpAqZzvLtIil1Pp9YxyvgBiTPsMJGYKS_eUUVe4gP6m7FeGSDKhfERLnHtTIWSXOk7-QZAzQgfDiovCt1qW0BF0JV-KooH3cOrcA6wlto7Hv_-uaPRB5vXIvIhCqI8MJz6fwEmv39Aixf23T17y7e-DwhwevJw0k2qNxiOVI1lvz9hSY-jbzN3vRnBfCrUb3D_w4jLrQiqGZndxIP57ZG4LFnhhzjXIhBaLmCXL_Q'
const getFirstLetters = (str:string|string):string => {
    const hasMatch = str.toString().match(/\b\w/g)
    if (hasMatch) {
        return hasMatch.join('')
    }
    return ''
}
export { isUrl, __DEV__, apiVersion, __DEV_TOKEN__, getFirstLetters };
