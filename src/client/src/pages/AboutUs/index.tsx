import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import { Chrono } from "react-chrono";
import './styles.css'


export default function AboutUs() {


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
                                customer engagement. At Cher-Ami Technologies, 
                                our mission is to provide a cutting
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

            <div className='platform-section'>
                <div className='ps-info-wrapper'>
                    <div className='ps-info'>
                        <div className='platform-section-title-wrapper'>
                            <span className='platform-section-title'>
                                Our Platform
                            </span>
                        </div>
                    </div>
                    <div className='platform-section-rows'>

                        <div className='ps-row'>
                            <div className='ps-row-left'>
                                <div className='oci-info-container-l'>
                                    <span className='oci-pre-info'>
                                        Omni-Channel Inbox
                                    </span>
                                    <span className='oci-title-info'>
                                        One Inbox For All Channels
                                    </span>
                                    <span className='oci-sub-info'>
                                        Bring your customer conversations together. 
                                        Empower customer service agents to support 
                                        customers more efficiently, without compromising on 
                                        customer experience. 
                                    </span>
                                </div>   
                            </div>
                            <div className='ps-row-right'>
                                <div 
                                    className='oci-image-container'
                                    //temporary styles below (remove when adding img)
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: 'center'
                                        
                                    }}
                                >
                                    Image Design <br/> 
                                    in progress!
                                </div>
                            </div>
                        </div>

                        <div className='ps-row'>
                            <div className='ps-row-left'>
                                <div 
                                    className='oci-image-container'
                                    //temporary styles below (remove when adding img)
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: 'center'
                                        
                                    }}
                                >
                                    Image Design <br/> 
                                    in progress!
                                </div>
                            </div>
                            <div className='ps-row-right'>
                                <div className='oci-info-container-r'>
                                    <span className='oci-pre-info'>
                                        Contacts Managed Easily
                                    </span>
                                    <span className='oci-title-info'>
                                        Easily Manage Contacts 
                                        and Contact Lists
                                    </span>
                                    <span className='oci-sub-info'>
                                        Easily dispatch emails, texts, and voice campaigns to 
                                        one or many of your predefined contact lists. or use 
                                        our contact dashboard to filter through your contacts 
                                        and generate new contact lists.
                                    </span>
                                </div>   
                                
                            </div>
                        </div>

                        <div className='ps-row'>
                            <div className='ps-row-left'>
                                <div className='oci-info-container-l'>
                                    <span className='oci-pre-info'>
                                        Intuitive Campaign Creation
                                    </span>
                                    <span className='oci-title-info'>
                                        Create Email, Text, and Voice 
                                        Campaigns Intuitively
                                    </span>
                                    <span className='oci-sub-info'>
                                        Easily create one-time or recurring email, text, and 
                                        voice campaigns to engage with your customers 
                                        easily and seamlessly 
                                    </span>
                                </div>   
                            </div>
                            <div className='ps-row-right'>
                                <div 
                                    className='oci-image-container'
                                    //temporary styles below (remove when adding img)
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: 'center'
                                        
                                    }}
                                >
                                    Image Design <br/> 
                                    in progress!
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div
                style={{
                    height: '1000px'
                }}
            >

            </div>
        </div>
    )
}