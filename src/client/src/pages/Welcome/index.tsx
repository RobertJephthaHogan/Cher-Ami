import React from "react";
import './styles.css'


export default function Welcome() {

    return (
        <div className="welcome-page">
            <div className="welcome-page-content">
                <div className='coming-soon-row'>
                    <div className='coming-soon-pigeon'>
                        
                    </div>
                </div>
                <div className="welcome-pg-success-text">
                    Success!
                </div>
                <div className="welcome-pg-welcome-text">
                    Welcome To Cher Ami.
                </div>
                <div className="welcome-pg-journey-text">
                    A Fleet Of Carrier Pigeons Now At Your Disposal.
                </div>
                <div className="redirect-text">
                    You will be redirected to login shortly.
                </div>
            </div>
        </div>
    )
}