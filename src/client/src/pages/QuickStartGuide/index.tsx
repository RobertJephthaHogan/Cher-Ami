import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import ComingSoon from '../../components/ComingSoon'



export default function QuickStartGuide() {

    return (
        <div>
            <HomepageHeader/>
            <div
                style={{
                    marginTop: '100px'
                }}
            >
                <ComingSoon/>
            </div>
        </div>
    )
}