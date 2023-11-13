import React from 'react'
import './styles.css'
import HomeOutlined from '@ant-design/icons/HomeOutlined'


export default function Settings() {

    return (
        <div className='settings-page'>
            <div className='settings-topbar'>
                <div className='settings-topbar-content'>
                    <span className='topbar-home-icon-container'>
                        <HomeOutlined/>
                    </span>
                    <span className='topbar-path-container'>
                        {'>'}
                    </span>
                    <span className='topbar-settings-text'>
                        Settings
                    </span>
                </div>
                <div className='topbar-bottom-divider'/>
            </div>
            Settings
        </div>
    )
}