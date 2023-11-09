import React from 'react'
import './styles.css'
import HomepageHeader from '../../components/HomepageHeader'
import { Button } from 'antd'


export default function Homepage() {
    return (
        <div className='homepage'>
            <HomepageHeader/>
            <div className='landing-section'>
                <div className='landing-section-left'>
                    <div className='landing-section-information'>
                        <div className='landing-section-title'>
                            <span className='landing-section-title-text'>
                                Omni-Channel <br/>
                                Communication Platform 
                            </span>
                        </div>
                        <div className='landing-section-description'>
                            <span className='landing-section-description-text'>
                                Effortlessly level up your customer engagement by using our <br/>
                                platform to launch marketing campaigns, receive customer <br/>
                                feedback, send notifications, and more via text and email.
                            </span>
                        </div>
                        <div className='landing-section-btn-container'>
                            <Button type='primary'>
                                Get started for free
                            </Button>
                        </div>
                        <div className='landing-section-info-container'>
                            <div> Set up in less than 15 minutes</div>
                        </div>
                    </div>
                </div>
                <div className='landing-section-right'>
                    Right
                </div>
            </div>
        </div>
    )
}