import React from 'react'
import './styles.css'


export default function HomepageHeader() {

    return (
        <div className='hp-header'>
            <div className='hp-header-left'>
                <div className='hp-header-left-content'>
                    <div className='hp-header-left-content-left'>
                        img here
                    </div>
                    <div className='hp-header-left-title-container'>
                        <div>
                            <span  className='title-text-top'>
                                Cher-Ami
                            </span>
                        </div>
                        <div>
                            <span className='title-text-bottom'>
                                Technologies
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hp-header-center'>

            </div>
            <div className='hp-header-right'>
                <div className='header-item-container h-item'>
                    <span className='header-item-text'>
                        Pricing
                    </span>
                </div>
                <div className='header-item-container h-item'>
                    <span className='header-item-text'>
                        About Us
                    </span>
                </div>
                <div className='header-item-container h-item'>
                    <span className='header-item-text'>
                        Log In
                    </span>
                </div>
            </div>
        </div>
    )
}