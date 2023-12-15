import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'


export default function HomepageHeader() {

    const navigate = useNavigate()

    
    function goToPricing() {
        navigate('/')
        setTimeout(function() {
            document?.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 25);
    }

    return (
        <div className='hp-header'>
            <div className='hp-header-left'>
                <div 
                    className='hp-header-left-content'
                    onClick={() => navigate('/')}
                >
                    <div className='hp-header-left-content-left'>
                        <div className='logo-img'>

                        </div>
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
                <div 
                    className='header-item-container h-item'
                    onClick={goToPricing}
                >
                    <span className='header-item-text'>
                        Pricing
                    </span>
                </div>
                <div 
                    className='header-item-container h-item'
                    onClick={() => navigate('/about')}
                >
                    <span className='header-item-text'>
                        About Us
                    </span>
                </div>
                <div 
                    className='header-item-container h-item'
                    onClick={() => navigate("/login")}
                >
                    <span className='header-item-text'>
                        Log In
                    </span>
                </div>
            </div>
        </div>
    )
}