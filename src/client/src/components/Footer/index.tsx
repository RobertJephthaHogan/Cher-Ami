import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'


export default function Footer() {

    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    const handleAboutSectionNavigation = (section: string) => {
        navigate('/about');
        setTimeout(function() {
            const s = document.getElementById(section);
            if (s) {
                s.scrollIntoView({ behavior: 'smooth' });
            }
        }, 25)
    };

    return (
        <div className='homepage-footer'>
            <div className='footer-top white'>
                <div className='footer-top-content-wrapper'>
                    <div className='ft-left'>
                        <div 
                            className='logo-container'
                            onClick={() => handleLogoClick()}
                        >
                            <div className='logo-container-left'>
                                <div className='logo-img'>

                                </div>
                            </div>
                            <div className='logo-title-container'>
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
                    <div className='ft-right'>
                        <div className='ft-menu'>
                            <div className='ft-menu-title-container'>
                                <span className='ft-menu-title'>
                                    Platform
                                </span>
                            </div>
                            <div className='ft-menu-option-container'>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('inbox')}
                                >
                                    Inbox
                                </span>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('contacts')}
                                >
                                    Contacts
                                </span>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('campaigns')}
                                >
                                    Campaigns
                                </span>
                            </div>
                        </div>
                        <div className='ft-menu'>
                            <div className='ft-menu-title-container'>
                                <span className='ft-menu-title'>
                                    Channels
                                </span>
                            </div>
                            <div className='ft-menu-option-container'>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('email')}
                                >
                                    Email
                                </span>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('sms')}
                                >
                                    SMS
                                </span>
                                <span 
                                    className='ft-menu-option'
                                    onClick={() => handleAboutSectionNavigation('voice')}
                                >
                                    Voice
                                </span>
                            </div>
                        </div>
                        <div className='ft-menu'>
                            <div className='ft-menu-title-container'>
                                <span className='ft-menu-title'>
                                    Resources
                                </span>
                            </div>
                            <div className='ft-menu-option-container'>
                                <span className='ft-menu-option'>
                                    Guides
                                </span>
                                <span className='ft-menu-option'>
                                    Docs
                                </span>
                                <span className='ft-menu-option'>
                                    Partners
                                </span>
                            </div>
                        </div>
                        <div className='ft-menu'>
                            <div className='ft-menu-title-container'>
                                <span className='ft-menu-title'>
                                    Company
                                </span>
                            </div>
                            <div className='ft-menu-option-container'>
                                <span className='ft-menu-option'>
                                    About
                                </span>
                                <span className='ft-menu-option'>
                                    Careers
                                </span>
                                <span className='ft-menu-option'>
                                    Support
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
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