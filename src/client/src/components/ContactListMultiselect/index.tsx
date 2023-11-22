import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'
import { Checkbox } from 'antd'
import './styles.css'


export default function ContactListMultiselect() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [selected, setSelected] = useState<any>()    

    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    const rows = userContactLists?.map((cl:any, i: any) => {
        return (
            <div 
                className={`cl-ms-row`}
                //onClick={() => onRowSelect(cl, i)}
            >
                <div>
                    <Checkbox/>
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