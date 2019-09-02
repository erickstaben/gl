import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import IsDev from '@/components/IsDev';

const Home = (): React.ReactNode => (
    <PageHeaderWrapper>
    <IsDev><b>MODO DE DESENVOLVIMENTO ATIVO</b></IsDev>
      <div>Algo para ser escrito</div>
    </PageHeaderWrapper>
  );
export default Home
