import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'
import { Checkbox } from 'antd'
import './styles.css'


interface ContactListMultiselectProps {
    onChange?: any
    selected?: any
}

export default function ContactListMultiselect(props: ContactListMultiselectProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])

    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }


    function toggleSelection(checked: any, cl: any ) {

        if (checked === true) {
            props?.onChange('recipientContactLists', [...props.selected, cl?.id])
        }

        if (checked === false) {
            const workingArray = [...props.selected]
            let newArray = workingArray.filter((item: any) => item !== cl?.id);
            props?.onChange('recipientContactLists', newArray)
        }
    }


    const rows = userContactLists?.map((cl:any, i: any) => {
        return (
            <div 
                className={`cl-ms-row`}
                key={`cl-ms-row-${i}`}
            >
                <div>
                    <Checkbox
                        onClick={(e) => toggleSelection((e.target as HTMLInputElement)?.checked, cl)}
                        checked={props.selected?.includes(cl?.id)}
                    />
                </div>
                <div>
                    <span className='cl-name-text'>
                        {cl?.name}
                    </span>
                </div>
            </div>
        )
    })

    return (
        <div className='contact-list-multiselect'>
            {rows}
        </div>
    )
}