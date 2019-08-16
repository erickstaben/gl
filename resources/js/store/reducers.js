import { combineReducers } from 'redux'

import auth from '../modules/auth/store/reducer'
import user from '../modules/user/store/reducer'
import articles from '../modules/article/store/reducer'
import layout from '../layout/store/reducer'

const loading = (state = { effects : {}}, { type, payload }) => {
    if(type.substr(0,7) === 'LOADING'){
        return {
            ...state,
            effects : {
                ...state.effects,
                [payload.fnName]: payload.status == 'start' ? true : false,
            }
        }
    }    
    return state  
}
  

export default combineReducers({ auth, user, articles, layout, loading })
