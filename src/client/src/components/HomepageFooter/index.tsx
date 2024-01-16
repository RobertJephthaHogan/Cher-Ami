import React from 'react'
import './styles.css'


export default function HomepageFooter() {

    return (
        <div className='homepage-footer'>
            <div className='footer-top white'>
                top
            </div>
            <div className='footer-divider'/>
            <div className='footer-bottom'>
                <div className='footer-bottom-left'>
                    <span className='fbl-cr-text'>
                        © 2024 Cher-Ami Technologies. All rights reserved.
                    </span>
                </div>
                <div className='footer-bottom-right'>
                    <span className='fbl-pp-text'>
                        Privacy Settings
                    </span>
                </div>
            </div>
        </div>
    )
}