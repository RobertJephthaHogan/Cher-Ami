import React from 'react'
import './styles.css'
import HomepageHeader from '../../components/HomepageHeader'
import { Button } from 'antd'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import ClusterOutlined from '@ant-design/icons/ClusterOutlined'
import TagOutlined from '@ant-design/icons/TagOutlined'


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
                            <div className='landing-info-wrapper'>
                                <ClockCircleOutlined />
                                <span className='landing-info-text'>
                                    Set up in less than 15 minutes
                                </span>
                            </div>
                            <div className='landing-info-wrapper'>
                                <ClusterOutlined />
                                <span className='landing-info-text'>
                                    Omni-channel support
                                </span>
                            </div>
                            <div className='landing-info-wrapper'>
                                <TagOutlined />
                                <span className='landing-info-text'>
                                    Fairly and transparently priced
                                </span>
                            </div>
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