import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

interface Props {

}

const ProcessesBoard = (props:Props) => {
    return (
        <div>
            <Collapse>
                <Panel key={1} header={'oi'}>
                    <Collapse>
                    <Panel key={2} header={'oi2'}>
                        asdasd
                    </Panel>
                    </Collapse>
                </Panel>
            </Collapse>
        </div>
    )
}

export default ProcessesBoard 