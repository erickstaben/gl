

import { __DEV__, __DEV_TOKEN__ } from '@/utils/utils';

interface Props {
    children : React.ReactElement
}
const IsDev = (props:Props): null | React.ReactElement => {
    if (__DEV__()) {
        localStorage.setItem('access-token', __DEV_TOKEN__)
        return (props.children)
    }
    return null
}

export default IsDev
