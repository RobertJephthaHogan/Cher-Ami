import React from 'react'
import './styles.css'


export default function Contacts() {

    return (
        <div className='contacts-page'>
            <div className='cp-left-panel'>
                <div className='cp-lp-header'>
                    <span className='cp-lp-header-text'>
                        Filters
                    </span>
                </div>
                left
            </div>
            <div className='cp-right-panel'>
                <div className='cp-rp-header'>
                    <div>
                        <span className='cp-rp-header-text'>
                            Contacts
                        </span>
                    </div>
                    <div>
                        Buttons
                    </div>
                </div>
                right
            </div>
        </div>
    )
}