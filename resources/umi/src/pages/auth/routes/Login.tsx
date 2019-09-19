import React, { useState } from 'react'
import styles from './Login.less';
import { useDispatch } from 'dva';
import { Spin} from 'antd';

interface Props {

}

const Login = (props: Props) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLogging,setIsLogging] = useState(false)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch({
            type: 'auth/login',
            payload: {
                body: {
                    email: email,
                    password: password,
                }
            }
        })

    }
    return (
        <Spin spinning={isLogging}>
            <div className={styles.formContainer}>
                <div className={styles.formInput}>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.formInput}>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleClick}>Fazer login</button>
            </div>
        </Spin>
        
    )
}

export default Login