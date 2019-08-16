import Http from './Http'
import Transformer from './Transformer'
import { stringify as urlString } from 'qs'

const request = ({params,path,method}) => {
  const response = new Promise((resolve, reject) => {
    if(['POST','PATCH'].includes(method)){
      return Http.request({
        url: `/${path}`,
        method,
        data: params
      }).then(res => resolve(res.data)).catch((err) => {
        console.log(err,'erro')
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode,
        };

        if (statusCode === 422) {
          const resetErrors = {
            errors: err.response.data,
            replace: false,
            searchStr: '',
            replaceStr: '',
          };
          data.error = Transformer.resetValidationFields(resetErrors);
        } else if (statusCode === 401) {
          data.error = err.response.data.message;
        }
        return reject(data);
      })
    }
    else{
      return Http.request({
        url: `/${path}?${urlString(params)}`,
        method,
      }).then(res => resolve(res.data)).catch((err) => {
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode,
        };

        if (statusCode === 422) {
          const resetErrors = {
            errors: err.response.data,
            replace: false,
            searchStr: '',
            replaceStr: '',
          };
          data.error = Transformer.resetValidationFields(resetErrors);
        } else if (statusCode === 401) {
          data.error = err.response.data.message;
        }
        return reject(data);
      })
    }
    
  })
  return response
}


export default request;