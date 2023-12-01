import { Checkbox, DatePicker, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs';
import './styles.css'


interface FrequencySelectorProps {
    onChange?: any
    submissionAttempted?: any
    frequencyVerificationData?: any
}

export default function FrequencySelector(props: FrequencySelectorProps) {

    const [frequencyType, setFrequencyTpe] = useState<any>('oneTime')
    const [sendDate, setSendDate] = useState<any>()
    const [frequencyInterval, setFrequencyInterval] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly')
    const [intervalSendDays, setIntervalSendDays] = useState<any>([])
    const [shouldSendInitial, setShouldSendInitial] = useState<boolean>(false)
    const [campaignStartDate, setCampaignStartDate] = useState<any>(undefined)
    const [campaignEndDate, setCampaignEndDate] = useState<any>(undefined)
    const [disableStartDatePicker, setDisableStartDatePicker] = useState<boolean>(false)


    useEffect(() => {

        const frequencyFormValues = {
            frequencyType: frequencyType,
            sendDate,
            sendOtInitial: shouldSendInitial,
            recurrence: {
                frequencyInterval,
                intervalSendDays,
                sendRecInitial: shouldSendInitial,
                startDate: campaignStartDate,
                endDate: campaignEndDate,
            }
        }

        props.onChange('frequency', frequencyFormValues)

    }, [
        frequencyType, 
        sendDate, 
        frequencyInterval, 
        intervalSendDays,
        shouldSendInitial,
        campaignStartDate,
        campaignEndDate
    ])
    
    useMemo(() => {
        setIntervalSendDays([])
    }, [frequencyInterval])

    function onCheck(e: any) {
        const sendInitialChecked = e?.target?.checked
        setDisableStartDatePicker(sendInitialChecked)

        setShouldSendInitial(e.target?.checked)
        
        if (sendInitialChecked) {
            setSendDate(dayjs().format())
        }
        
    }

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
                        {
                            (props.submissionAttempted && (props.frequencyVerificationData?.data?.sendDate === 'error'))
                            ? (
                                <span className='required-freq-field-error'>
                                    * A send date is required for a one-time email
                                </span>
                            )
                            : null
                        }
                        <div className='send-date-selector-inputs'>
                            <div>
                                <div>
                                    <span className='start-date-title'>
                                        Send Date
                                    </span>
                                </div>
                                <div>
                                    <DatePicker
                                        showTime
                                        disabled={disableStartDatePicker}
                                        value={
                                            sendDate
                                            ? dayjs(sendDate)
                                            : undefined
                                        }
                                        onChange={(v) => setSendDate(v?.format())}
                                    />
                                </div>
                            </div>
                            <div className='initial-checkbox-container'>
                                <span className='start-date-title'>
                                    Start immediately
                                </span>
                                <div>
                                    <Checkbox
                                        checked={shouldSendInitial}
                                        onChange={(e) => onCheck(e)}
                                    />
                                </div>
                            </div>
                        </div>
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
                                frequencyVerificationData={props.frequencyVerificationData}
                                submissionAttempted={props.submissionAttempted}
                            />
                        </div>
                        <div>
                            <IntervalSendDaysSelector
                                frequencyInterval={frequencyInterval}
                                setIntervalSendDays={setIntervalSendDays}
                                intervalSendDays={intervalSendDays}
                                frequencyVerificationData={props.frequencyVerificationData}
                                submissionAttempted={props.submissionAttempted}
                            />
                        </div>
                        <div>
                            <StartDateSelector
                                shouldSendInitial={shouldSendInitial}
                                setShouldSendInitial={setShouldSendInitial}
                                campaignStartDate={campaignStartDate}
                                setCampaignStartDate={setCampaignStartDate}
                                frequencyVerificationData={props.frequencyVerificationData}
                                submissionAttempted={props.submissionAttempted}
                            />
                        </div>
                        <div>
                            <EndDateSelector
                                campaignEndDate={campaignEndDate}
                                setCampaignEndDate={setCampaignEndDate}
                                frequencyVerificationData={props.frequencyVerificationData}
                                submissionAttempted={props.submissionAttempted}
                            />
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
    frequencyVerificationData?: any
    submissionAttempted?: any
}

function FrequencyTypeSelector(props: FrequencyTypeSelectorProps) {

    
    return (
        <div className='frequency-type-selector'>
            <div>
                <span className='frequency-type-selector-text'>
                    Recurrence Interval
                </span>
                {
                    (props.submissionAttempted && (props.frequencyVerificationData?.data?.frequencyInterval === 'error'))
                    ? (
                        <span className='required-freq-field-error'>
                            * A frequency interval is required
                        </span>
                    )
                    : null
                }
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
    frequencyVerificationData?: any
    submissionAttempted?: any
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


    function WeeklySendDaysSelector() {
        const weekData = [
            {
                title: 'monday',
                code: 'Mon'
            },
            {
                title: 'tuesday',
                code: 'Tue'
            },
            {
                title: 'wednesday',
                code: 'Wed'
            },
            {
                title: 'thursday',
                code: 'Thur'
            },
            {
                title: 'friday',
                code: 'Fri'
            },
            {
                title: 'saturday',
                code: 'Sat'
            },
            {
                title: 'sunday',
                code: 'Sun'
            },
        ]
        return (
            <div className='weekly-send-days-selector'>
                {
                    weekData?.map((day: any) => {
                        return (
                            <div
                                className={`sdo ${
                                    isSelectedDay(day?.title) ? 'selected-sdo' : ''
                                }`} 
                                onClick={() => handleSendDaysChange(day?.title)}
                                key={day?.title}
                            >
                                {day?.code}
                            </div>
                        )
                    }) || []
                }
            </div>
        )
    }

    function MonthlySendDaysSelector() {

        let daysArray = [];
        for (let i = 1; i <= 31; i++) {
            daysArray.push(i);
        }

        return (
            <div className='monthly-send-days-selector'>
                {
                    daysArray?.map((day: any) => {

                        return (
                            <div
                                className={`msdo ${
                                    isSelectedDay(day) ? 'selected-msdo' : ''
                                }`} 
                                onClick={() => handleSendDaysChange(day)}
                                key={day}
                            >
                                {day}
                            </div>
                        )
                    })
                }
            </div>
        )

    }

    return (
        <div>

            <div className='sds-title-bar'>
                <span className='send-days-selector-text'>
                    Select Recurring Days of 
                </span>
                {
                    props.frequencyInterval === 'weekly'
                    ? (
                        <span className='send-days-selector-interval-text'>
                            Week
                        </span>
                    ) : null
                }
                {
                    props.frequencyInterval === 'monthly'
                    ? (
                        <span className='send-days-selector-interval-text'>
                            Month
                        </span>
                    ) : null
                }
                {
                    props.frequencyInterval === 'yearly'
                    ? (
                        <span className='send-days-selector-interval-text'>
                            Year
                        </span>
                    ) : null
                }
                <div>
                    {
                        (props.submissionAttempted && (props.frequencyVerificationData?.data?.intervalSendDays === 'error'))
                        ? (
                            <span className='required-freq-field-error'>
                                * You must select at least one day within your recurrence interval
                            </span>
                        )
                        : null
                    }
                </div>
            </div>

            {
                props.frequencyInterval === 'weekly'
                ? (
                    <WeeklySendDaysSelector/>
                ) : null
            }


            {
                props.frequencyInterval === 'monthly'
                ? (
                    <div>
                        <MonthlySendDaysSelector/>
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


interface StartDateSelectorProps {
    shouldSendInitial?: any
    setShouldSendInitial?: any
    campaignStartDate?: any
    setCampaignStartDate?: any
    frequencyVerificationData?: any
    submissionAttempted?: any
}

function StartDateSelector(props: StartDateSelectorProps) {

    const [disableStartDatePicker, setDisableStartDatePicker] = useState<boolean>(false)

    function onCheck(e: any) {
        const sendInitialChecked = e?.target?.checked
        setDisableStartDatePicker(sendInitialChecked)

        props.setShouldSendInitial(e.target?.checked)
        
        if (sendInitialChecked) {
            props.setCampaignStartDate(dayjs().format())
        }
        
    }

    function onStartDateChange(v: any) {
        props.setCampaignStartDate(v?.format())
    }

    return (
        <div className='start-date-selector'>
            <div>
                {
                    (props.submissionAttempted && (props.frequencyVerificationData?.data?.startDate === 'error'))
                    ? (
                        <span className='required-freq-field-error'>
                            * Recurring email campaigns must have a start date
                        </span>
                    )
                    : null
                }
            </div>
            <div className='start-date-selector-inputs'>
                <div>
                    <span className='start-date-title'>
                        Start Date
                    </span>
                    <div>
                        <DatePicker
                            value={dayjs(props.campaignStartDate)}
                            onChange={(v) => onStartDateChange(v)}
                            disabled={disableStartDatePicker}
                        />
                    </div>
                </div>
                <div className='initial-checkbox-container'>
                    <span className='start-date-title'>
                        Start immediately
                    </span>
                    <div>
                        <Checkbox
                            checked={props.shouldSendInitial}
                            onChange={(e) => onCheck(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}



interface EndDateSelectorProps {
    campaignEndDate?: any
    setCampaignEndDate?: any
    frequencyVerificationData?: any
    submissionAttempted?: any
}

function EndDateSelector(props: EndDateSelectorProps) {

    return (
        <div className='end-date-selector'>
            <div>
                <div>
                    {
                        (props.submissionAttempted && (props.frequencyVerificationData?.data?.endDate === 'error'))
                        ? (
                            <span className='required-freq-field-error'>
                                * Recurring email campaigns must have an end date
                            </span>
                        )
                        : null
                    }
                </div>
                <span className='end-date-title'>
                    End Date
                </span>
                <div>
                    <DatePicker
                        value={dayjs(props.campaignEndDate)}
                        onChange={(v) => props.setCampaignEndDate(v?.format())}
                    />
                </div>
            </div>
        </div>
    )
}