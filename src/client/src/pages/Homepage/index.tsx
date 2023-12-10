import React from 'react'
import './styles.css'
import HomepageHeader from '../../components/HomepageHeader'
import { Button } from 'antd'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import ClusterOutlined from '@ant-design/icons/ClusterOutlined'
import TagOutlined from '@ant-design/icons/TagOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import { useNavigate } from 'react-router-dom'


export default function Homepage() {

    const navigate = useNavigate()

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
                            <Button 
                                type='primary'
                                onClick={() => navigate("/signup")}
                            >
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
                    <div className='landing-img'></div>
                </div>
            </div>
            <div className='text-msg-section'>
                <div className='text-msg-section-left'>
                    <div className='text-msg-section-left-content'>
                        <div>
                            <span className='tm-section-pre-text'>
                                Send Text Messages
                            </span>
                        </div>
                        <div className='large-text-container'>
                            <span className='tm-section-large-text'>
                                Send mass alerts, updates, <br/>
                                and marketing campaigns
                            </span>
                        </div>
                        <div className='sub-text-container'>
                            <span className='tm-section-sub-text'>
                                Get instant results from text marketing campaigns with built-in scheduling <br/>
                                and segmentation.
                            </span>
                        </div>
                        <div className='details-text-container'>
                            <ul className='tm-section-details-text'>
                                <li>Personalize messages</li>
                                <li>Filter by groups, tags, and keywords</li>
                                <li>Schedule in advance</li>
                                <li>Send recurring messages</li>
                            </ul>
                        </div>
                        <div className='start-for-free-text-container'>
                            <span 
                                className='start-for-free-text sff-btn'
                                onClick={() => navigate("/signup")}
                            >
                                Start For Free
                            </span>
                            <RightOutlined className='sff-btn ml-10'/>
                        </div>
                    </div>
                </div>
                <div className='text-msg-section-right'>
                    <div className='text-msg-right-panel'>

                    </div>
                </div>
            </div>
            <div className='email-section'>
                <div className='email-section-left'>
                    <div className='email-left-panel'>

                    </div>
                </div>
                <div className='email-section-right'>
                    <div className='email-section-right-content'>
                        <div>
                            <span className='email-section-pre-text'>
                                Send Emails
                            </span>
                        </div>
                        <div className='large-text-container'>
                            <span className='email-section-large-text'>
                                Send promotions, surveys, <br/>
                                and widgets when text <br/>
                                wont cut it
                            </span>
                        </div>
                        <div className='sub-text-container'>
                            <span className='email-section-sub-text'>
                                Sometimes a text isn't enough.  Send emails containing widgets, surveys,  <br/>
                                and promotions with built in scheduling.
                            </span>
                        </div>
                        <div className='details-text-container'>
                            <ul className='email-section-details-text'>
                                <li>Send widgets, surveys, and beautiful emails</li>
                                <li>Filter by groups, tags, and keywords</li>
                                <li>Schedule in advance</li>
                                <li>Send recurring messages</li>
                            </ul>
                        </div>
                        <div 
                            className='start-for-free-text-container'
                            onClick={() => navigate("/signup")}
                        >
                            <span className='start-for-free-text sff-btn'>
                                Start For Free
                            </span>
                            <RightOutlined className='sff-btn ml-10'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='get-started-section'>
                <div className='get-started-info-section'>
                    <div className='gsis-content'>
                        <div className='gsis-text-container'>
                            <span className='gsis-title-text'>
                                Get started in minutes.
                            </span>
                        </div>
                        <div className='gsis-text-container gsis-tcb'>
                            <span className='gsis-description-text'>
                                Integrate your accounts with our platform to start sending messages today. 
                            </span>
                        </div>
                        <div className='gsis-text-container gsis-tcb'>
                            <span className='gsis-guide-text'>
                                Check out our quick-start guide here.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='get-started-cards-section'>
                    <div className='gs-card'>
                        <div className='gs-card-text'>
                            <div className='gs-card-text-row'>
                                <span className='gs-card-title'>
                                    Connect your Accounts
                                </span>
                            </div>
                            <div className='gs-card-text-row'>
                                <span className='gs-card-subtitle'>
                                    Add your account details
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='gs-card'>
                    <div className='gs-card-text'>
                        <div className='gs-card-text-row'>
                            <span className='gs-card-title'>
                                Upload your contacts
                            </span>
                        </div>
                        <div className='gs-card-text-row'>
                            <span className='gs-card-subtitle'>
                                Upload you contact lists with a few easy clicks
                            </span>
                        </div>
                    </div>
                    </div>
                    <div className='gs-card'>
                    <div className='gs-card-text'>
                        <div className='gs-card-text-row'>
                            <span className='gs-card-title'>
                                Contact your customers
                            </span>
                        </div>
                        <div className='gs-card-text-row'>
                            <span className='gs-card-subtitle'>
                                Send or schedule messages <br/>
                                with our platform
                            </span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}