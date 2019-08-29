import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ConnectState } from '@/models/connect';
import { ID } from '@/models/database';

const PipeConfig = () => (
        <Row>
            A ser desenvolvido
            Necessário:
                - Modificar os campos disponiveis em cada fase
                - Modificar a ordem das fases
                - Criar e remover fases
                - Criar e modificar os cards recorrentes.
        </Row>
    )

export default PipeConfig
