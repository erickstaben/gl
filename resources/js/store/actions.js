
import * as authActions from '../modules/auth/store/actions'
import * as userActions from '../modules/user/store/actions'
import * as articleActions from '../modules/article/store/actions'
import request from '../utils/Request'



const allActions =  {...articleActions,...userActions,...authActions}

export  function dispatcher({params,action,path,method}){
    return async dispatch => {
        const dispatchName = `LOADING_${allActions[action]().type}`
        dispatch({type: `${dispatchName}_START`,payload: {fnName: action,status: 'start'}})    
        const result = await request({
            params,
            path,
            method
        })
        dispatch(allActions[action](result))
        dispatch({type: `${dispatchName}_END`,payload: {fnName: action,status: 'end'}})
      
    }
}
export default allActions;
