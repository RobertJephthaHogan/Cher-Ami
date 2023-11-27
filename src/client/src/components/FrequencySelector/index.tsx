import { DatePicker, Radio } from 'antd'
import React, { useMemo, useState } from 'react'
import './styles.css'


interface FrequencySelectorProps {
    onChange?: any
}

export default function FrequencySelector(props: FrequencySelectorProps) {

    const [frequencyType, setFrequencyTpe] = useState<any>('oneTime')
    const [sendDate, setSendDate] = useState<any>()

    console.log('sendDate', sendDate)

    useMemo(() => {

        const frequencyFormValues = {
            frequencyType: frequencyType,
            sendDate,
            sendInitial: true,
            recurrence: {}
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
                            onChange={(v) => setSendDate(v?.format('YYYY-MM-DD HH:mm:ss'))}
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