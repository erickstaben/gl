import styles from './index.less';

import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'dva';


const Timer = (props) => {
    const dispatch = useDispatch();

    const pauseTimer = (id: string) => {
        dispatch({
            type: 'events/pauseTimer',
            payload: {
                path_id: [id],
            }
        })
    }
    const endTimer = (id: string) => {
        dispatch({
            type: 'events/endTimer',
            payload: {
                path_id: [id],
            }
        })
    }
    const { timer } = props
    if(timer) {
        return (
            <div className={styles.timerContainer}>
                <div className={styles.timerHeader}>
                    <span>{timer.title}</span>
                </div>
                {timer.paused 
                ? 
                <div className={styles.timerCounter}>{Math.round(timer.duration / 60000)} min</div>
                 : 
                <InnerTimer initial={Math.round(timer.duration / 1000)} />
                }
                <div className={styles.timerFooter}>
                    <button onClick={() => pauseTimer(timer.id)}>
                        {timer.paused ? 'Continuar' : 'Pausar'}
                    </button>
                    <button onClick={() => endTimer(timer.id)}>Finalizar</button>
                </div>
                
            </div>
        )
    }
    else {
        return 'nada'
    }

}

const InnerTimer = (props) => {
    const { initial } = props
    const [now, setNow] = useState(initial)

    useInterval(() => {
        setNow(now + 1)
    }, 1000)

    return (
        <div className={styles.timerCounter}>
            {moment().minute(0).second(now).format('mm:ss')}
        </div>
    )
}



function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return function cleanup() {
            clearInterval(id)
        };
    }, [delay]);
}

export default Timer