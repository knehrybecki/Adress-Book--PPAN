import { useFetch } from 'lib/hooks'
import { RootState } from 'lib/reducers'
import { GroupReducerTypes } from 'lib/types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const UseAdressBook = () => {
  const {
    GROUPS,
    CONTACTS,
    CONTACTS_TRASH,
    CONTACTS_FREE_NUMBERS,
    CONTACTS_GROUPS,
  } = GroupReducerTypes
  const {
    getAllGroups,
    getAllContacts,
    getAllContactsFromTrash,
    getAllContactsFromFreeNumbers,
    getAllContactsFromGroups,
  } = useFetch()

  const { selectedGroup, groups, contacts } = useSelector(
    (state: RootState) => state.side
  )

  const wasCalled = useRef<boolean>(false)

  const dispatch = useDispatch()
  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    getAllGroups().then((data) => {
      if (!data) return
      dispatch({ type: GROUPS, payload: data })
    })

    getAllContacts().then((data) => {
      if (!data) return
      dispatch({ type: CONTACTS, payload: data })
    })
    getAllContactsFromTrash().then((data) => {
      if (!data) return
      dispatch({ type: CONTACTS_TRASH, payload: data })
    })
    getAllContactsFromFreeNumbers().then((data) => {
      if (!data) return
      dispatch({ type: CONTACTS_FREE_NUMBERS, payload: data })
    })
    getAllContactsFromGroups(selectedGroup).then((data) => {
      if (!data) return
      dispatch({ type: CONTACTS_GROUPS, payload: data })
    })
  }, [
    CONTACTS,
    CONTACTS_FREE_NUMBERS,
    CONTACTS_GROUPS,
    CONTACTS_TRASH,
    GROUPS,
    contacts,
    dispatch,
    getAllContacts,
    getAllContactsFromFreeNumbers,
    getAllContactsFromGroups,
    getAllContactsFromTrash,
    getAllGroups,
    groups,
    selectedGroup,
  ])
}
