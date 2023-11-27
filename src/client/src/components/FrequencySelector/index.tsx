import { DatePicker, Radio } from 'antd'
import React, { useState } from 'react'
import './styles.css'


export default function FrequencySelector() {

    const [frequencyType, setFrequencyTpe] = useState<any>('single')

    return (
        <div className='frequency-selector'>
            <div className='fs-radio-group-row'>
                <Radio.Group 
                    onChange={(e) => setFrequencyTpe(e?.target?.value)} 
                    defaultValue={'single'}
                >
                    <Radio value={'single'}>One Time</Radio>
                    <Radio value={'recurring'}>Recurring</Radio>
                </Radio.Group>
            </div>
            {
                frequencyType === 'single'
                ? (
                    <div className='datepicker-row'>
                        <DatePicker
                            showTime
                        />
                    </div>
                )
                : null
            }
            {
                frequencyType === 'recurring'
                ? (
                    'TODO: SELECT RECURRING FREQUENCY'
                )
                : null
            }
        </div>
    )
}