import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import { Chrono } from "react-chrono";
import './styles.css'


export default function AboutUs() {


    const timelineItems = [
        {
            title: "May 1940",
            cardTitle: "Dunkirk",
            //url: "http://www.history.com",
            cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
            cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        }, 
        {
            title: "May 1940",
            cardTitle: "Dunkirk",
            //url: "http://www.history.com",
            cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
            cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        }, 
        {
            title: "May 1940",
            cardTitle: "Dunkirk",
            url: "http://www.history.com",
            cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
            cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        }, 
        {
            title: "May 1940",
            cardTitle: "Dunkirk",
            url: "http://www.history.com",
            cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
            cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        }, 
        {
            title: "May 1940",
            cardTitle: "Dunkirk",
            url: "http://www.history.com",
            cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
            cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        }, 
    ];

    return (
        <div className='about-us'>
            <HomepageHeader/>
            <div className='about-us-banner'/>
            <div className='about-us-body'>
                <div className='aub-info-wrapper'>
                    <div className='aub-info'>
                        <div  className='about-us-title-wrapper'>
                            <span className='about-us-title'>
                                About Us
                            </span>
                        </div>
                        <div className='aub-info-content'>
                            <span className='about-us-info'>
                                We’re building an omnichannel communication 
                                platform to help businesses of all sizes level up their 
                                customer engagement.
                            </span>
                        </div>
                        <div className='aub-info-content'>
                            <span className='about-us-info'>
                                At Cher-Ami Technologies, our mission is to provide a cutting
                                edge omnichannel communication platform to help businesses
                                of all sizes level up their customer engagement. We believe
                                companies of all sizes should be able to provide high quality
                                email, text, and voice experience for their customers, without
                                breaking the bank, or needing in-house developers. 
                            </span>
                        </div>
                        <div className='aub-info-content'>
                            <span className='about-us-info'>
                                During World War I, the lost battalion was 
                                surrounded by German soldiers in the Battle of
                                Argonne. Every carrier pigeon they sent out for help
                                was killed. Cher Ami was their last one. The lost battalion watched
                                him get shot down. All hope was lost. But somehow,
                                he took flight again and reached his destination. 
                                Saved 200 lives and was awarded the Croix de 
                                Guerre. Cher Ami means "dear friend".

                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='about-us-body'>
                <div className='aub-info-wrapper'>
                    <div className='aub-info'>
                        <div  className='about-us-title-wrapper'>
                            <span className='about-us-title'>
                                Timeline
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='about-us-timeline-section'>
                <div style={{ width: '800px', height: '950px' }}>
                    <Chrono 
                        items={timelineItems} 
                        mode="VERTICAL_ALTERNATING" 
                        itemWidth={800}
                        theme={{
                            //primary: 'red',
                            //secondary: 'blue',
                            //cardBgColor: 'yellow',
                            //titleColor: 'black',
                            //titleColorActive: 'red',
                        }}
                    >
                        
                    </Chrono>
                </div>
            </div>
        </div>
    )
}