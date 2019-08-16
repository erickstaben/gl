import React from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routesList from '../../routes/routes';
import { getAuthorityLevel } from '../../utils/functions'

const { SubMenu } = Menu;


const Sidebar = () => {
    const collapsed = useSelector(state => state.layout.sidebarCollapsed)    
    
    const authority = getAuthorityLevel(useSelector(state => state.user.authority))
    const getMenuRender = (routes,depth) => {
        return routes.map(route => {
            if(route.routes && (authority >= getAuthorityLevel(route.authority))){
                if(depth == 0){
                    return (
                        <SubMenu title={
                            <span>
                            <Icon type={route.icon || 'mail'} />
                            <span>{route.title || 'Sem título'}</span>
                            </span>
                        } key={route.path}>
                            {getMenuRender(route.routes,depth+1)}
                        </SubMenu>
                    )                        
                }
                if(depth == 1){
                    return (
                        <Menu.ItemGroup key={route.path} title={'Sem título'}>
                            {getMenuRender(route.routes,depth+1)}
                        </Menu.ItemGroup>
                    )
                }                
            }
            return route.showInMenu 
            && (authority >= getAuthorityLevel(route.authority))
            && (
                <Menu.Item key={route.path}>
                    <Icon type={route.icon || "pie-chart"} className={'fithub-sidebar-icon'}/>
                    <span><Link to={route.path}>{route.title || 'Sem título'}</Link></span>
                </Menu.Item>
            )
        })
    }
    return ( <div className={'fithub-sidebar-container'}>
        <Menu
            style={collapsed ? {width: 80} : {width: 256} }
            className={'fithub-sidebar-menu-container'}
            defaultSelectedKeys={['1']}
            inlineCollapsed={collapsed}
            mode="inline"
        >
            {getMenuRender(routesList,0)}
        </Menu>
    </div>    
    );
}

export default Sidebar