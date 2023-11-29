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

    }, [frequencyType, sendDate, frequencyInterval, intervalSendDays])
    
    useMemo(() => {
        setIntervalSendDays([])
    }, [frequencyInterval])

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
                            <IntervalSendDaysSelector
                                frequencyInterval={frequencyInterval}
                                setIntervalSendDays={setIntervalSendDays}
                                intervalSendDays={intervalSendDays}
                            />
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
            <div>
                <span className='frequency-type-selector-text'>
                    Recurrence Interval
                </span>
            </div>
            <div className='frequency-type-selector-content'>
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
        </div>
    )
}


interface IntervalSendDaysSelectorProps {
    frequencyInterval?: any
    setIntervalSendDays?: any
    intervalSendDays?: any
}

function IntervalSendDaysSelector(props: IntervalSendDaysSelectorProps) {

    function handleSendDaysChange(day: any) {

        const workingArr = [...props.intervalSendDays]
        const exists = workingArr?.find((item: any) => item === day)

        if (!exists) {
            // If not in intervalSendDays, add it 
            workingArr.push(day)
            props.setIntervalSendDays(workingArr)
        }
        if (exists) {
            // If in intervalSendDays, remove it 
            const newDays = workingArr.filter((item: any) => item !== exists)
            props.setIntervalSendDays(newDays)
        }

    }

    function isSelectedDay(day: any) {
        return props.intervalSendDays?.find((item: any) => item === day)
    }

    return (
        <div>


            {
                props.frequencyInterval === 'weekly'
                ? (
                    <div className='weekly-send-days-selector'>
                        <div 
                            className={`sdo ${
                                isSelectedDay('monday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('monday')}
                        >
                            Mon
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('tuesday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('tuesday')}
                        >
                            Tue
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('wednesday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('wednesday')}
                            >
                            Wed
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('thursday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('thursday')}
                        >
                            Thu
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('friday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('friday')}
                        >
                            Fri
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('saturday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('saturday')}
                        >
                            Sat
                        </div>
                        <div 
                            className={`sdo ${
                                isSelectedDay('sunday') ? 'selected-sdo' : ''
                            }`} 
                            onClick={() => handleSendDaysChange('sunday')}
                        >
                            Sun
                        </div>
                    </div>
                ) : null
            }


            {
                props.frequencyInterval === 'monthly'
                ? (
                    <div>
                        'monthly'
                    </div>
                ) : null
            }


            {
                props.frequencyInterval === 'yearly'
                ? (
                    <div>
                        Coming soon!
                    </div>
                ) : null
            }


        </div>
    )
}