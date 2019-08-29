
import React from 'react';

interface Props {
    className?: string,
    text ?: string
}
const SpanText = (props: Props):React.ReactElement => (
    <span className={props.className}>{props.text || 'Sem texto'}</span>
)
export default SpanText
