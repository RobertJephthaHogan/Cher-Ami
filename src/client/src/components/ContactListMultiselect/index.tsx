import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'



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

    return (
        <div>
            Contact List Multiselect
        </div>
    )
}