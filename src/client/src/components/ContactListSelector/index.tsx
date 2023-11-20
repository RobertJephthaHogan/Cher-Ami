import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactActions from '../../redux/actions/contact'
import contactListActions from '../../redux/actions/contactList'



interface ContactListSelectorProps {
    onSelect?: any
}

export default function ContactListSelector(props: ContactListSelectorProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])

    
    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactActions.setContacts(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    const rows = userContactLists?.map((cl:any) => {
        console.log('cl', cl)
        return (
            <div 
                className='contact-list-row'
                onClick={() => props.onSelect(cl)}
            >
                <span className='cl-name-text'>
                    {cl?.name}
                </span>
            </div>
        )
    })

    return (
        <div className='contact-list-selector'>
            {rows}
        </div>
    )
}