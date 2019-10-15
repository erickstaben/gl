/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { __DEV__, apiVersion } from './utils';
import router from 'umi/router';

const codeMessage = {
  200: 'O servidor retornou com sucesso os dados solicitados.',
  201: 'As modificações foram feitas com sucesso!',
  204: 'Dados excluidos com sucesso',
  400: 'Houve um erro na solicitação. Tente novamente com os dados corretos',
  401: 'Você não está autenticado',
  403: 'Você não tem permissão para isso!',
  500: 'O servidor está com problemas por favor tente mais tarde',
  502: 'Erro no gateway',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Erro ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Não foi possivél acessar a internet. Verifique sua conexão.',
      message: 'Sem Internet',
    });
  }
  console.log(response.status,response.status == 401)
  if(response.status == 401){
    router.push('/auth/login')
  }
  return response;
};

const getAccessToken = () => localStorage.getItem('access-token')
/**
 * 配置request请求时的默认参数
 */

let access_token = getAccessToken()
export const updateAccessToken = () => {
  access_token = getAccessToken()
  request = extend({
    errorHandler,
    headers: access_token ? {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    } : {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    prefix: `http://${window.location.host == 'localhost:8000' ? 'gl.test' : window.location.host}/api/${apiVersion}`,
  });
}
let request = extend({
  errorHandler,
  headers: access_token ? {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } : {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  prefix: `http://${window.location.host == 'localhost:8000' ? 'gl.test' : window.location.host}/api/${apiVersion}`,
});

export default request;
