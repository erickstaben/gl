
import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, ReactElement, useState } from 'react';
import Link from 'umi/link';
import { useDispatch, useSelector } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './MainLayout.less';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Dispatch } from '@/models/connect';
import logo from '../assets/logo.svg';
import { Icon, Statistic } from 'antd';
import classnames from 'classnames';
import config from '../../config/config';
import ReactTooltip from 'react-tooltip';
import { HotKeys } from 'react-hotkeys';
import { router } from 'umi';
import { getAuthority } from '@/utils/authority';
import logo_gl from '@/assets/logo_gl.png';
import only_logo from '@/assets/only_logo.png';
import { MdPlusOne, MdEmail, MdBook } from 'react-icons/md';
import NewEventModal from '@/pages/cards/components/NewEventModal/NewEvent';
import { NewCardModal } from '@/pages/cards/components';
import moment from 'moment'
import Timer from '@/components/Timer';

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
                payload: {
                    access_token: localStorage.getItem('access-token')
                }
            });
            dispatch({
                type: 'settings/getSetting',
            });
        }
    }, []);
    const user = useSelector((state:any) => state.auth.user)
    const timers = useSelector((state:ConnectState) => state.events.timers)
    if(!user.id && localStorage.getItem('access-token') == null){
        console.log('Redirecting on layout')
        router.push('/auth/login')
    }
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
                        <Icon style={!collapsed ? {height: 32,width: 32} : {}} data-tip={route.name} type={route.icon}/>
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

    const pauseTimer = (id:string) => {
        dispatch({
            type: 'events/pauseTimer',
            payload: {
                path_id: [id],
            }
        })
    }
    const endTimer = (id:string) => {
        dispatch({
            type: 'events/endTimer',
            payload: {
                path_id: [id],
            }
        })
    }
    const [eventModal,setEventModal] = useState(false)
    const [cardModal,setCardModal] = useState(false)
    const handlers = (collapsed:boolean) => {console.log('collapse inside handlers'); return ({
        CHANGE_LAYOUT: () => handleMenuCollapse(!collapsed),
        OPEN_CARD_MODAL: () => setCardModal(!cardModal),
        OPEN_EVENT_MODAL: () => setEventModal(!eventModal)
    })}
    return (
        <HotKeys allowChanges className={styles.layoutContainer} handlers={handlers(collapsed)} keyMap={{CHANGE_LAYOUT: 's',OPEN_EVENT_MODAL: 'e', OPEN_CARD_MODAL: 'c'}}>
            {collapsed && <ReactTooltip type='info' effect={'solid'} delayHide={150}/>}
            <aside className={classnames(styles.sidebar, { [styles.sidebarCollapse]: collapsed },{ [styles.sidebarUncollapse]: !collapsed })}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.menuFold} onClick={() => handleMenuCollapse(!collapsed)}>
                        <Icon type="menu-fold"/>
                    </span>
                    <div className={classnames(styles.avatar,{[styles.avatarCollapsed]: collapsed})}><img src={'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}/></div>
                    <p className={classnames(styles.name, { [styles.nameCollapsed]: collapsed })}>{user.name}</p>
                    <p className={classnames(styles.info, { [styles.infoCollapsed]: collapsed })}>{user.email}</p>
                </div>
                <ul className={styles.sidebarMenu}>
                    {renderMenuItems(routes[1].routes)}                   
                </ul>
                <div className={styles.glLogoContainer}>
                    <img className={classnames(styles.glLogo,{[styles.glLogoCollapsed]: collapsed})} src={collapsed ? only_logo : logo_gl}/>
                </div>
                <footer className={classnames(styles.sidebarFooter,collapsed ? styles.sidebarFooterCollapsed : styles.sidebarFooterUncollapsed)}>
                    <div className={styles.actionButtons}>
                        <span><Icon type='setting'/></span>
                    </div>
                    <div onClick={() => dispatch({
                        type: 'auth/logout'
                    })} className={styles.actionButtons}>
                        <span><Icon type='logout'/></span>
                    </div>
                </footer>
            </aside>
            <div style={{ display: 'flex', width: `calc(100% - ${collapsed  ? 80 : 280}px)`,flexDirection: 'column'}}>
                {children}
            </div>
            <div className={styles.eventButton}>
                <div onClick={() => setEventModal(true)} className={styles.fab}>
                    <i><MdBook /></i>
                </div>
            </div>
            <div className={styles.cardButton}>
                <div onClick={() => setCardModal(true)} className={styles.fab}>
                    <i><MdEmail /></i>
                </div>
            </div>
            <div className={styles.timersContainer}>
                {timers.map(timer => {
                    return (
                        <Timer timer={timer} />
                    )
                })}
            </div>
            {eventModal && <NewEventModal isVisible={eventModal} toggleModal={setEventModal}/>}
            {setCardModal && <NewCardModal isVisible={cardModal} toggleModal={setCardModal} />}
        </HotKeys>
    )
};


export default MainLayout
