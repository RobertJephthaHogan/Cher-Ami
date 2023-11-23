import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'
import { Checkbox } from 'antd'
import './styles.css'


export default function ContactListMultiselect() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [selected, setSelected] = useState<any>([])    

    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    function toggleSelection(checked: any, cl: any ) {

        if (checked === true) {
            //ToDo: add contactlist to selected
            setSelected([...selected, cl?.id])
        }

        if (checked === false) {
            //ToDo: add contactlist to selected
            const workingArray = [...selected]
            let newArray = workingArray.filter((item: any) => item !== cl?.id);
            setSelected(newArray)
        }
    }


    const rows = userContactLists?.map((cl:any, i: any) => {
        return (
            <div className={`cl-ms-row`}>
                <div>
                    <Checkbox
                        onClick={(e) => toggleSelection((e.target as HTMLInputElement)?.checked, cl)}
                        value={selected.includes(cl?.id)}
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