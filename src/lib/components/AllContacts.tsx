import { TrashGroup } from 'assets/svg'

import { useFetch } from 'lib/hooks'
import { RootState } from 'lib/reducers'
import { GroupReducerTypes, HomeReducerTypes } from 'lib/types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import styled from 'styled-components'

type ShowOptionSelected = { showOptionSelected: boolean }
type showOptionContact = { showOptionContact?: boolean }
type checkContacts = { isChecked: boolean }
type height = { height: number }

export const AllContacts = () => {
  const { CONTACTS_TRASH } = GroupReducerTypes
  const {
    SHOW_HEADER,
    SEARCH_CONTACTS,
    CHECKED_CONTACTS,
    CONTAINER_HEIGHT,
    IS_CHECKED,
    SHOW_OPTION_SELECTED,
    SHOW_OPTION_CONTACT,
    PREVIEW_CONTACT,
  } = HomeReducerTypes
  const { contacts, selectedGroup, contactsTrash, nameSelected } = useSelector(
    (state: RootState) => state.side
  )
  const {
    filteredContacts,
    checkedContacts,
    containerHeight,
    isChecked,
    showOptionSelected,
    showOptionContact,
  } = useSelector((state: RootState) => state.home)

  const { deleteContactTrash, getAllContactsFromTrash } = useFetch()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [checked, setChecked] = useState<boolean>()
  // const [checkedContacts, setCheckedContacts] = useState<CheckedContacts>([])
  // const [showOptionSelected, setShowOptionSelected] = useState<boolean>(false)
  // const [showOptionContact, setShowOptionContact] = useState<string>()
  // const [containerHeight, setContainerHeight] = useState(
  //   window.innerHeight - 170
  // )
  const moreDotsRef = useRef<HTMLDivElement>(null)
  const optionContactRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    checkedContacts.length === 0
      ? dispatch({ type: IS_CHECKED, payload: false })
      : dispatch({ type: IS_CHECKED, payload: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedContacts])

  useEffect(() => {
    switch (selectedGroup) {
      case 'Kontakty':
        dispatch({ type: SEARCH_CONTACTS, payload: contacts })
        break
      case 'Kosz':
        dispatch({ type: SEARCH_CONTACTS, payload: contactsTrash })
        break
      case 'Wolne Numery':
        break
      // case nameSelected:
      //   break
      default:
        dispatch({ type: SEARCH_CONTACTS, payload: contacts })
        break
    }

    dispatch({ type: SHOW_HEADER, payload: true })
  }, [
    SHOW_HEADER,
    dispatch,
    contacts,
    SEARCH_CONTACTS,
    selectedGroup,
    contactsTrash,
    nameSelected,
  ])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDotsRef.current &&
        !moreDotsRef.current.contains(event.target as Node)
      ) {
        // setShowOptionSelected(false)
        dispatch({ type: SHOW_OPTION_SELECTED, payload: false })
      }
    }

    const handleBodyClick = (event: MouseEvent) => {
      handleClickOutside(event)
    }

    document.body.addEventListener('click', handleBodyClick)

    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isOutside = true
      for (const key in optionContactRefs.current) {
        if (optionContactRefs.current[key]?.contains(event.target as Node)) {
          isOutside = false
          break
        }
      }

      if (isOutside) {
        // setShowOptionContact('')
        dispatch({ type: SHOW_OPTION_CONTACT, payload: '' })
      }
    }

    const handleBodyClick = (event: MouseEvent) => {
      handleClickOutside(event)
    }

    document.body.addEventListener('click', handleBodyClick)

    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMoreDotsClick = (id: string) => {
    // setShowOptionContact(id)
    dispatch({ type: SHOW_OPTION_CONTACT, payload: id })
  }

  const handleContactClick = (contactId: string) => {
    navigate(`/adress-book/person/${contactId}`, { replace: true })
  }
  useEffect(() => {
    const handleResize = () => {
      // setContainerHeight(window.innerHeight - 170)
      dispatch({ type: CONTAINER_HEIGHT, payload: window.innerHeight - 170 })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const allContacts = filteredContacts.map((contact, index) => (
    <ContactList
      key={index}
      isChecked={checkedContacts.includes(contact.id as string)}
      onClick={() => {
        dispatch({ type: PREVIEW_CONTACT, payload: contact })
        handleContactClick(contact.id)
        // previewContact(contact)
      }}
    >
      <Name>
        <BoxName>
          <ContainerCheckBox key={contact.id}>
            <CheckBoxInput
              type='checkbox'
              id={contact.id}
              checked={checkedContacts.includes(contact.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const contactId = e.currentTarget.getAttribute('id') as string

                const isChecked = e.target.checked

                isChecked
                  ? dispatch({
                      type: CHECKED_CONTACTS,
                      payload: [...checkedContacts, contactId],
                    })
                  : dispatch({
                      type: CHECKED_CONTACTS,
                      payload: checkedContacts.filter((id) => id !== contactId),
                    })
              }}
            ></CheckBoxInput>
          </ContainerCheckBox>{' '}
          <ContactItem>{contact.firstName}</ContactItem>
          <ContactItem>{contact.lastName}</ContactItem>
        </BoxName>
      </Name>
      <ContactItem>{contact.email}</ContactItem>
      <Phone>
        <BoxPhone>
          <ContactItem>{contact.phoneMobile}</ContactItem>
          {contact.phoneHome ? <SeparatorPhone /> : null}
          <ContactItem>{contact.phoneHome}</ContactItem>
        </BoxPhone>
      </Phone>
      <Company>
        <BoxCompany>
          <ContactItem>
            {' '}
            {contact.positionInCompany
              ? `${contact.positionInCompany}, ${contact.companyName}`
              : `${contact.companyName}`}{' '}
          </ContactItem>
          <BoxContactOption>
            <MoreDotsContact
              id={contact.id}
              ref={(ref) => {
                optionContactRefs.current[contact.id] = ref
              }}
              isChecked={checkedContacts.includes(contact.id)}
              onClick={(e) => {
                const id = e.currentTarget.getAttribute('id') as string
                handleMoreDotsClick(id)
                // setShowOptionContact(id)
                dispatch({ type: SHOW_OPTION_CONTACT, payload: id })
                e.stopPropagation()
                handleMoreDotsClick(contact.id)
              }}
            >
              <DotsContact />
              <DotsContact />
              <DotsContact />
            </MoreDotsContact>
            <OptionContact showOptionContact={showOptionContact === contact.id}>
              <DeleteContact
                data-group={contact.group}
                onClick={(e) => {
                  const trashGroup = '111111111111'
                  const id = contact.id
                  const contactGroup = e.currentTarget.getAttribute(
                    'data-group'
                  ) as string

                  deleteContactTrash(id, contactGroup, trashGroup)

                  getAllContactsFromTrash().then((data) => {
                    if (!data) return

                    dispatch({ type: CONTACTS_TRASH, payload: data })
                  })
                  dispatch({ type: SHOW_OPTION_CONTACT, payload: '' })
                  // setShowOptionContact('')
                }}
              >
                <TrashGroup /> Usuń
              </DeleteContact>
            </OptionContact>
          </BoxContactOption>
        </BoxCompany>
      </Company>
    </ContactList>
  ))

  return (
    <Container height={containerHeight}>
      {isChecked ? (
        <SelectedBox>
          <MoreDots
            ref={moreDotsRef}
            onClick={() => {
              // setShowOptionSelected(!showOptionSelected)
              dispatch({
                type: SHOW_OPTION_SELECTED,
                payload: !showOptionSelected,
              })
            }}
          >
            <Dots />
            <Dots />
            <Dots />
          </MoreDots>
          <CountSelected>Wybrane : {checkedContacts.length}</CountSelected>
          <OptionBox showOptionSelected={showOptionSelected}>
            <Choose>
              <ChooseAll
                onClick={() => {
                  const allContactIds = contacts.map((contact) => contact.id)

                  checkedContacts
                    ? dispatch({
                        type: CHECKED_CONTACTS,
                        payload: allContactIds,
                      })
                    : null
                }}
              >
                Wszystkie
              </ChooseAll>
              <ChooseNothing
                onClick={() => {
                  // setCheckedContacts([])
                  dispatch({ type: CHECKED_CONTACTS, payload: [] })
                }}
              >
                Żaden
              </ChooseNothing>
            </Choose>
          </OptionBox>
        </SelectedBox>
      ) : (
        <>
          <HeaderTitleContacts>
            <HeaderTitleContactsItem>Nazwa</HeaderTitleContactsItem>
            <HeaderTitleContactsItem>Email</HeaderTitleContactsItem>
            <HeaderPhone>
              <HeaderTitleContactsItem>Numer Telefonu</HeaderTitleContactsItem>
            </HeaderPhone>
            <HeaderTitleContactsItem>
              Stanowisko i Firma
            </HeaderTitleContactsItem>
          </HeaderTitleContacts>
        </>
      )}
      {/* <Separator /> */}
      <Contacts>
        <CountContacts>Kontakty: ({allContacts.length})</CountContacts>
        <ContainerContacts>{allContacts}</ContainerContacts>
      </Contacts>
    </Container>
  )
}

const Container = styled.div<height>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: ${({ height }) => height}px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`
const HeaderTitleContacts = styled.div`
  display: table;
  width: 100%;
  padding-left: 10px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border-bottom: 1px solid #adadad;
`
const HeaderTitleContactsItem = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;
`

const HeaderPhone = styled.div``

const SeparatorPhone = styled.div`
  width: 1px;
  height: 15px;

  background-color: black;
`
const ContainerContacts = styled.div``
const ContainerCheckBox = styled.div`
  visibility: hidden;
  vertical-align: middle;
`
const DeleteContact = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e8e8e8;
  }
`
const DotsContact = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #adadad;
  margin: 5px 0;
`
const MoreDotsContact = styled.div<checkContacts>`
  cursor: pointer;
  visibility: hidden;
  visibility: ${({ isChecked }) => (isChecked ? 'visbility' : 'hidden')};
  &:hover ${DotsContact} {
    background-color: #000;
  }
  padding: 2px;
`
const ContactList = styled.div<checkContacts>`
  display: table;
  width: 100%;
  margin-left: 10px;
  padding: 5px;
  background-color: ${({ isChecked }) => (isChecked ? '#e8e8e8' : 'initial')};
  cursor: pointer;
  &:hover ${ContainerCheckBox} {
    visibility: visible;
  }

  &:hover ${MoreDotsContact} {
    visibility: visible;
  }

  &:hover {
    background-color: #e8e8e8;
  }
`
const CheckBoxInput = styled.input`
  transform: scale(1.5);
  cursor: pointer;

  &:checked {
    visibility: visible;
  }
`
const ContactItem = styled.p`
  font-size: 13px;
  display: table-cell;
  vertical-align: middle;
`

const Phone = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;
`
const Company = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;
`

const Name = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;
`

const BoxName = styled.div`
  display: flex;
  column-gap: 10px;
`
const BoxPhone = styled.div`
  display: flex;
  column-gap: 5px;
`
const BoxCompany = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`
const CountContacts = styled.div`
  margin-left: 10px;
  font-size: 13px;
`

const Contacts = styled.div``
const SelectedBox = styled.div`
  display: flex;
  color: #e30613;
  align-items: center;
  margin-left: 10px;
  column-gap: 10px;
  position: relative;
  bottom: 10px;
  height: 40px;
`

const Dots = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #e30613;
  margin: 3px 0;
`

const MoreDots = styled.div`
  cursor: pointer;

  &:hover ${Dots} {
    background-color: #000;
  }
`

const CountSelected = styled.div``

const OptionBox = styled.div<ShowOptionSelected>`
  display: ${({ showOptionSelected }) =>
    showOptionSelected ? 'block' : 'none'};
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.25);
  width: 120px;
  height: 60px;
  top: 30px;
  left: 10px;
  z-index: 99;
`
const Choose = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 5px 5px 5px 10px;
  color: #000;
  font-weight: 600;
`
const ChooseAll = styled.div`
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: #e30613;
  }
`
const ChooseNothing = styled.div`
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: #e30613;
  }
`

const OptionContact = styled.div<showOptionContact>`
  display: ${({ showOptionContact }) => (showOptionContact ? 'block' : 'none')};
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.25);
  width: 150px;
  height: 100px;
  top: 30px;
  right: 50px;
  z-index: 99;
`
const BoxContactOption = styled.div`
  position: relative;
`
