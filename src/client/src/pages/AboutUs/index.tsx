import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import './styles.css'


export default function AboutUs() {

    return (
        <div className='about-us'>
            <HomepageHeader/>
            <div className='about-us-banner'/>
            <div className='about-us-body'>
                About Us
            </div>
        </div>
    )
}