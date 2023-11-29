import { DatePicker, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'


interface FrequencySelectorProps {
    onChange?: any
}

export default function FrequencySelector(props: FrequencySelectorProps) {

    const [frequencyType, setFrequencyTpe] = useState<any>('oneTime')
    const [sendDate, setSendDate] = useState<any>()
    const [frequencyInterval, setFrequencyInterval] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly')
    const [intervalSendDays, setIntervalSendDays] = useState<any>([])


    useEffect(() => {

        const frequencyFormValues = {
            frequencyType: frequencyType,
            sendDate,
            sendInitial: true,
            recurrence: {
                frequencyInterval,
                intervalSendDays,
                startDate: null,
                endDate: null,
            }
        }

        props.onChange('frequency', frequencyFormValues)

    }, [frequencyType, sendDate])
    

    return (
        <div className='frequency-selector'>
            <div className='fs-radio-group-row'>
                <Radio.Group 
                    onChange={(e) => setFrequencyTpe(e?.target?.value)} 
                    defaultValue={'oneTime'}
                >
                    <Radio value={'oneTime'}>One Time</Radio>
                    <Radio value={'recurring'}>Recurring</Radio>
                </Radio.Group>
            </div>

            {
                frequencyType === 'oneTime'
                ? (
                    <div className='datepicker-row'>
                        <DatePicker
                            showTime
                            //onChange={(v) => setSendDate(v?.format('YYYY-MM-DD HH:mm:ss'))}
                            onChange={(v) => setSendDate(v?.format())}
                        />
                    </div>
                )
                : null
            }

            {
                frequencyType === 'recurring'
                ? (
                    <div>
                        <div>
                            <FrequencyTypeSelector
                                setFrequencyInterval={setFrequencyInterval}
                                frequencyInterval={frequencyInterval}
                            />
                        </div>
                        <div>
                            Interval Send Days
                        </div>
                        <div>
                            Start Date
                        </div>
                        <div>
                            End Date
                        </div>
                    </div>
                )
                : null
            }
        </div>
    )
}



interface FrequencyTypeSelectorProps {
    setFrequencyInterval?: any
    frequencyInterval?: any
}

function FrequencyTypeSelector(props: FrequencyTypeSelectorProps) {

    
    return (
        <div className='frequency-type-selector'>
            <div 
                className={`frequency-type-option ${
                    props.frequencyInterval === 'daily' ? 'selected-fto': ''
                }`}
                onClick={() => props.setFrequencyInterval('daily')}
            >
                Daily
            </div>
            <div 
                className={`frequency-type-option ${
                    props.frequencyInterval === 'weekly' ? 'selected-fto': ''
                }`}
                onClick={() => props.setFrequencyInterval('weekly')}
            >
                Weekly
            </div>
            <div 
                className={`frequency-type-option ${
                    props.frequencyInterval === 'monthly' ? 'selected-fto': ''
                }`}
                onClick={() => props.setFrequencyInterval('monthly')}
            >
                Monthly
            </div>
            <div 
                className={`frequency-type-option ${
                    props.frequencyInterval === 'yearly' ? 'selected-fto': ''
                }`}
                onClick={() =>props.setFrequencyInterval('yearly')}
            >
                Yearly
            </div>
        </div>
    )
}