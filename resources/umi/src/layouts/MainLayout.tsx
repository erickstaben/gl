
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
import { Icon } from 'antd';
import classnames from 'classnames';
import config from '../../config/config';
import ReactTooltip from 'react-tooltip';
import { HotKeys } from 'react-hotkeys';

const routes = config.routes;

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
    const user = useSelector((state:any) => state.auth.user)
    const renderMenuItems = (routes) => {
        if(routes.routes){
            <li><Icon data-tip={'Nome do campo'} type='user'/>{!collapsed && <div>
                {renderMenuItems(routes.routes)}
            </div>}</li>
        }
        return routes.filter(r => r.path && !r.hideInMenu).map(route => {
            return (
                <Authorized authority={route.authority || ['user','admin','super']}>
                <Link to={route.path || '/'}>
                    <li>
                        <Icon style={!collapsed ? {height: 32,width: 32} : {}} data-tip={'Nome do campo'} type={route.icon}/>
                        {!collapsed && <div>
                            {route.name}
                        </div>}
                    </li>
                </Link>
                </Authorized>                
            )
        }) 
    }
    const handleMenuCollapse = (payload: boolean): void =>{
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload,
        })
    }
    const handlers = (collapsed:boolean) => {console.log('collapse inside handlers'); return ({CHANGE_LAYOUT: () => handleMenuCollapse(!collapsed)})}
    return (
        <HotKeys allowChanges className={styles.layoutContainer} handlers={handlers(collapsed)} keyMap={{CHANGE_LAYOUT: 's'}}>
            {collapsed && <ReactTooltip type='info' effect={'solid'} delayHide={150}/>}
            <aside className={classnames(styles.sidebar, { [styles.sidebarCollapse]: collapsed },{ [styles.sidebarUncollapse]: !collapsed })}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.menuFold} onClick={() => handleMenuCollapse(!collapsed)}>
                        <Icon type="menu-fold"/>
                    </span>
                    <div className={classnames(styles.avatar,{[styles.avatarCollapsed]: collapsed})}></div>
                    <p className={classnames(styles.name, { [styles.nameCollapsed]: collapsed })}>{user.name}</p>
                    <p className={classnames(styles.info, { [styles.infoCollapsed]: collapsed })}>{user.email}</p>
                </div>
                <ul className={styles.sidebarMenu}>
                    {renderMenuItems(routes[1].routes)}                   
                </ul>
                <footer className={classnames(styles.sidebarFooter,collapsed ? styles.sidebarFooterCollapsed : styles.sidebarFooterUncollapsed)}>
                    <div className={styles.actionButtons}>
                        <span><Icon type='setting'/></span>
                    </div>
                    <div className={styles.actionButtons}>
                        <span><Icon type='plus'/></span>
                    </div>
                </footer>
            </aside>
            <div style={{display: 'flex',width: '100%',flexDirection: 'column'}}>
                {children}
            </div>
        </HotKeys>
    )
};

export default MainLayout