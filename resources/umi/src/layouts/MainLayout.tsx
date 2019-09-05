
import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, ReactElement } from 'react';
import Link from 'umi/link';
import { useDispatch, useSelector } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './MainLayout.less';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Dispatch } from '@/models/connect';
import logo from '../assets/logo.svg';
import classnames from 'classnames';
import routes from '../../config/config';


interface Props { 
    children: ReactElement
}

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map(item => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : [],
        };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    });


const MainLayout = (props: Props) => {
    const { children } = props;
    const dispatch = useDispatch()
    const collapsed = useSelector((state:ConnectState)=> state.global.collapsed)
    /**
     * constructor
     */

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'auth/authUser',
            });
            dispatch({
                type: 'settings/getSetting',
            });
        }
    }, []);

    const handleMenuCollapse = (payload: boolean): void =>{
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload,
        })
    }
        
    console.log('layout', routes)

    return (
        <div style={{display: 'inline-flex',height: '100%'}}>
            <aside className={classnames(styles.sidebar, { [styles.sidebarCollapse]: collapsed },{ [styles.sidebarUncollapse]: !collapsed })}>
                <div>
                    <div className={styles.sidebarHeader}>
                        <div className={styles.avatar}><div></div>Avatar</div>
                        <div className={styles.name}>nome</div>
                        <div className={styles.info}>info</div>
                    </div>
                    <ul className={styles.sidebarMenu}>
                        <li>asd</li>
                        <ul>
                            <li>dsa</li>
                        </ul>
                        <li>asd</li>
                        <button onClick={() => handleMenuCollapse(!collapsed)}>
                            Collapse
                    </button>
                    </ul>
                    <footer className={styles.sidebarActionButtons}>
                        <div className={styles.actionButtons}>
                            <span>Configurações</span>
                        </div>
                        <div className={styles.actionButtons}>
                            <span>Mais</span>
                        </div>
                    </footer>
                </div>
            </aside>
            {children}
        </div>
    )
};

export default MainLayout