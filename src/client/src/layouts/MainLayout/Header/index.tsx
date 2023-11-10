import React from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { store } from "../../../redux/store";
import userActions from "../../../redux/actions/user";


export default function LayoutHeader() {

    const navigate = useNavigate()


    function onMenuClick(item: any) {
        console.log('item', item)

        if (item === 'settings') {
            navigate('/settings')
        }

        if (item === 'log-out') {
            store.dispatch(userActions.logout())
            navigate('/')
        }
    }

    const items: MenuProps['items'] = [
        {
          label: (
            <a onClick={() => onMenuClick('settings')}>
                Settings
            </a>
          ),
          key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a onClick={() => onMenuClick('log-out')}>
                    Log Out
                </a>
              ),
          key: '1',
        },
      ];

    return (
        <div className="layout-header">
            <div className='layout-header-left layout-header-cell'>
                <div 
                    className='layout-header-left-wrapper'
                    onClick={() => navigate('/')}
                >
                    <span className='header-left-title-text'>
                        <span className='header-left-title-bold'>
                            Gateway
                        </span>
                        <span className='header-left-title-light'>
                            Fitness
                        </span>
                    </span>
                    <span className='header-left-subtitle-text'>
                        The Gateway to a Healthier life
                    </span>
                </div>
            </div>
            <div className='layout-header-center layout-header-cell'>

            </div>
            <div className='layout-header-right layout-header-cell'>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <MenuOutlined className="header-menu-icon"/>
                </Dropdown>
            </div>

        </div>
    )
}