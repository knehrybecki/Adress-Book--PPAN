import { TrashGroup } from 'assets/svg'
import { RoutePath } from 'lib/config'
import React from 'react'
import { useFetch, usePopper } from 'lib/hooks'
import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import {
  GroupReducerTypes,
  HomeReducerTypes,
  idDefaulValue,
  selectedGroupText,
} from 'lib/types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import styled from 'styled-components'
import { Images } from 'assets'

type ShowOptionSelected = { showOptionSelected: boolean }
type showOptionContact = { showOptionContact?: boolean }
type checkContacts = { isChecked: boolean }
type height = { height: number }
type showOptionMoveToGroup = { showOptionMoveToGroup: boolean }
type showMoreOptionCheckedContacts = { showMoreOptionCheckedContacts: boolean }

export const AllContacts = () => {
  const { CONTACTS_TRASH, CONTACTS_GROUPS } = GroupReducerTypes
  const {
    SHOW_HEADER,
    SEARCH_CONTACTS,
    CHECKED_CONTACTS,
    CONTAINER_HEIGHT,
    IS_CHECKED,
    SHOW_OPTION_SELECTED,
    SHOW_OPTION_CONTACT,
    PREVIEW_CONTACT,
    SHOW_OPTION_MOVE_TO_GROUP,
    SHOW_MORE_OPTION_CHECKED_CONTACTS,
  } = HomeReducerTypes

  const { contactPreview } = RoutePath

  const {
    contacts,
    selectedGroup,
    contactsTrash,
    nameSelected,
    contactsFreeNumbers,
    contactsFromGroups,
    groups,
  } = useSelector((state: RootState) => state.side)

  const {
    filteredContacts,
    checkedContacts,
    containerHeight,
    isChecked,
    showOptionSelected,
    showOptionContact,
    showOptionMoveToGroup,
    showMoreOptionCheckedContacts,
  } = useSelector((state: RootState) => state.home)

  const {
    deleteContactTrash,
    getAllContactsFromTrash,
    getAllContactsFromGroups,
    groupChangeGroup,
    deleteManyContactsTrash,
  } = useFetch()

  const { handleMouseEntryPopper, handleMouseLeavePopper } = usePopper()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedGrouptoMove, setSelectedGrouptoMove] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const moreDotsRef = useRef<HTMLDivElement>(null)
  const optionContactRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const checkedContactOptionRef = useRef<HTMLDivElement>(null)
  const moveToGroupRef = useRef<HTMLDivElement>(null)

  const wasCalled = useRef<boolean>(false)

  const { trashID } = idDefaulValue

  const { adressBook } = PL_pl
  useEffect(() => {
    if (wasCalled.current) return
    wasCalled.current = true

    getAllContactsFromGroups(selectedGroup).then((data) => {
      if (!data) return
      dispatch({ type: CONTACTS_GROUPS, payload: data })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup])

  useEffect(() => {
    checkedContacts.length === 0
      ? dispatch({ type: IS_CHECKED, payload: false })
      : dispatch({ type: IS_CHECKED, payload: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedContacts])

  useEffect(() => {
    const { Kontakty, Kosz, WolneNumery } = selectedGroupText

    dispatch({
      type: CHECKED_CONTACTS,
      payload: [],
    })

    switch (selectedGroup) {
      case Kontakty:
        dispatch({ type: SEARCH_CONTACTS, payload: contacts })
        break
      case Kosz:
        dispatch({ type: SEARCH_CONTACTS, payload: contactsTrash })
        break
      case WolneNumery:
        dispatch({ type: SEARCH_CONTACTS, payload: contactsFreeNumbers })
        break
      case selectedGroup:
        if (
          selectedGroup !== Kontakty &&
          selectedGroup !== WolneNumery &&
          selectedGroup !== Kosz
        ) {
          dispatch({ type: SEARCH_CONTACTS, payload: contactsFromGroups })
        }
        break
      default:
        dispatch({ type: SEARCH_CONTACTS, payload: contacts })
        break
    }

    dispatch({ type: SHOW_HEADER, payload: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    SHOW_HEADER,
    dispatch,
    contacts,
    SEARCH_CONTACTS,
    selectedGroup,
    contactsTrash,
    nameSelected,
    contactsFreeNumbers,
    contactsFromGroups,
  ])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDotsRef.current &&
        !moreDotsRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: SHOW_MORE_OPTION_CHECKED_CONTACTS, payload: false })
      }
      if (
        checkedContactOptionRef.current &&
        !checkedContactOptionRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: SHOW_OPTION_SELECTED, payload: false })
      }
      if (
        moveToGroupRef.current &&
        !moveToGroupRef.current.contains(event.target as Node) &&
        event.target.tagName !== 'OPTION'
      ) {
        dispatch({ type: SHOW_OPTION_MOVE_TO_GROUP, payload: false })
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
    dispatch({ type: SHOW_OPTION_CONTACT, payload: id })
  }

  const handleContactClick = (contactId: string) => {
    navigate(`${contactPreview}${contactId}`, { replace: true })
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch({ type: CONTAINER_HEIGHT, payload: window.innerHeight - 225 })
        return
      }
      dispatch({ type: CONTAINER_HEIGHT, payload: window.innerHeight - 170 })
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const allGroups = groups.map((item) => (
    <React.Fragment key={item.id}>
      <OptionGroup
        onClick={() => {
          setSelectedGrouptoMove(item.name)
          dispatch({ type: SHOW_OPTION_MOVE_TO_GROUP, payload: true })
        }}
        isChecked={selectedGrouptoMove === item.name}
        value={item.name}
        key={item.id}
        id={`${item.id}`}
      >
        {item.name}: ({item.isContacts})
      </OptionGroup>
    </React.Fragment>
  ))

  const sortedContacts = filteredContacts
    .map((contact) => ({
      ...contact,
    }))
    .sort((a, b) => {
      const firstNameA = a.firstName.toLowerCase()
      const firstNameB = b.firstName.toLowerCase()
      return firstNameA.localeCompare(firstNameB)
    })

  const allContacts = sortedContacts.map((contact, index) => (
    <ContactList
      key={index}
      isChecked={checkedContacts.some(
        (checkedContact) => checkedContact.id === contact.id
      )}
      onClick={() => {
        dispatch({ type: PREVIEW_CONTACT, payload: contact })
        handleContactClick(contact.id)
      }}
      draggable={true}
      onDragStart={(e) => {
        const crt = e.target.cloneNode(true)
        crt.style.display = 'none'
        crt.style.cursor = 'grab'

        document.body.appendChild(crt)
        e.dataTransfer.setDragImage(crt, 0, 0)

        setIsDragging(true)
        e.dataTransfer.setData('text/plain', JSON.stringify(checkedContacts))
      }}
      onDrag={(e) => {
        e.preventDefault()
        const drg = document.querySelector('.drg')

        drg.style.left = `${e.clientX}px`
        drg.style.top = `${e.clientY}px`
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDragEnd={() => setIsDragging(false)}
    >
      <Name>
        <BoxName>
          <ContainerCheckBox key={contact.id}>
            <CheckBoxInput
              type='checkbox'
              id={contact.id}
              checked={checkedContacts.some(
                (checkedContact) => checkedContact.id === contact.id
              )}
              onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: SHOW_OPTION_SELECTED,
                  payload: false,
                })
                dispatch({
                  type: SHOW_OPTION_MOVE_TO_GROUP,
                  payload: false,
                })
              }}
              onChange={(e) => {
                const contactId = e.currentTarget.getAttribute('id') as string

                const isChecked = e.target.checked

                isChecked
                  ? dispatch({
                      type: CHECKED_CONTACTS,
                      payload: [...checkedContacts, contact],
                    })
                  : dispatch({
                      type: CHECKED_CONTACTS,
                      payload: checkedContacts.filter(
                        (contact) => contact.id !== contactId
                      ),
                    })
              }}
            ></CheckBoxInput>
          </ContainerCheckBox>{' '}
          <ContactItem>{contact.firstName}</ContactItem>
          <ContactItem>{contact.lastName}</ContactItem>
        </BoxName>
      </Name>
      <Email>
        <ContactItem>
          {contact.email ? (
            contact.email
          ) : (
            <div style={{ minWidth: '33%' }}></div>
          )}
        </ContactItem>
      </Email>
      <Phone>
        <BoxPhone>
          <ContactItem>{contact.phoneMobile}</ContactItem>
          {contact.phoneHome && contact.phoneMobile ? <SeparatorPhone /> : null}
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
        </BoxCompany>
      </Company>
      <BoxContactOption>
        <MoreDotsContact
          id={contact.id}
          ref={(ref) => {
            optionContactRefs.current[contact.id] = ref
          }}
          isChecked={checkedContacts.some(
            (checkedContact) => checkedContact.id === contact.id
          )}
          onClick={(e) => {
            const id = e.currentTarget.getAttribute('id') as string
            handleMoreDotsClick(id)

            dispatch({ type: SHOW_OPTION_CONTACT, payload: id })
            e.stopPropagation()
            handleMoreDotsClick(contact.id)
          }}
        >
          <DotsContact />
          <DotsContact />
          <DotsContact />
        </MoreDotsContact>
        <OptionContact
          showOptionContact={showOptionContact === contact.id}
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteContact
            data-group={contact.group}
            onClick={(e) => {
              const id = contact.id
              const contactGroup = e.currentTarget.getAttribute(
                'data-group'
              ) as string

              deleteContactTrash(id, contactGroup, trashID)

              getAllContactsFromTrash().then((data) => {
                if (!data) return

                dispatch({ type: CONTACTS_TRASH, payload: data })
              })
              dispatch({ type: SHOW_OPTION_CONTACT, payload: '' })
            }}
          >
            <TrashGroup /> {adressBook.quickViewContact.delete}
          </DeleteContact>
        </OptionContact>
      </BoxContactOption>
    </ContactList>
  ))

  return (
    <Container height={containerHeight}>
      {isChecked ? (
        <SelectedBox>
          <ContainerSelected>
            <CheckedContactsOption
              ref={checkedContactOptionRef}
              onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: SHOW_OPTION_SELECTED,
                  payload: !showOptionSelected,
                })
                dispatch({ type: SHOW_OPTION_MOVE_TO_GROUP, payload: false })
                dispatch({
                  type: SHOW_MORE_OPTION_CHECKED_CONTACTS,
                  payload: false,
                })
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='35'
                viewBox='0 -960 960 960'
                width='35'
                fill='#e30613'
              >
                <path d='M480-360 280-559h400L480-360Z' />
              </svg>
            </CheckedContactsOption>

            <CountSelected>
              {adressBook.optionSelectedContacts.selected}{' '}
              {checkedContacts.length}
            </CountSelected>
            <OptionBox showOptionSelected={showOptionSelected}>
              <Choose>
                <ChooseAll
                  onClick={() => {
                    const allContactIds = contacts.map((contact) => contact)

                    checkedContacts
                      ? dispatch({
                          type: CHECKED_CONTACTS,
                          payload: allContactIds,
                        })
                      : null
                  }}
                >
                  {adressBook.optionSelectedContacts.all}
                </ChooseAll>
                <ChooseNothing
                  onClick={() => {
                    dispatch({ type: CHECKED_CONTACTS, payload: [] })
                    dispatch({
                      type: SHOW_OPTION_SELECTED,
                      payload: !showOptionSelected,
                    })
                  }}
                >
                  {adressBook.optionSelectedContacts.nothing}
                </ChooseNothing>
              </Choose>
            </OptionBox>
          </ContainerSelected>
          <MoreOption>
            <MoveToGroup
              ref={moveToGroupRef}
              onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: SHOW_OPTION_MOVE_TO_GROUP,
                  payload: !showOptionMoveToGroup,
                })
                dispatch({
                  type: SHOW_OPTION_SELECTED,
                  payload: false,
                })

                dispatch({
                  type: SHOW_MORE_OPTION_CHECKED_CONTACTS,
                  payload: false,
                })
              }}
            >
              {' '}
              <Svg
                aria-label='Przenieś do grupy'
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#000000'
                onMouseEnter={handleMouseEntryPopper}
                onMouseLeave={handleMouseLeavePopper}
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z' />
              </Svg>
            </MoveToGroup>
            <MoreDots
              ref={moreDotsRef}
              onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: SHOW_MORE_OPTION_CHECKED_CONTACTS,
                  payload: !showMoreOptionCheckedContacts,
                })
                dispatch({
                  type: SHOW_OPTION_SELECTED,
                  payload: false,
                })
                dispatch({ type: SHOW_OPTION_MOVE_TO_GROUP, payload: false })
              }}
            >
              <Dots />
              <Dots />
              <Dots />
            </MoreDots>
            <OptionBoxMoveToGroup showOptionMoveToGroup={showOptionMoveToGroup}>
              <Choose>
                <ContactOption
                  onClick={(e) => setSelectedGrouptoMove(e.currentTarget.value)}
                  isChecked={selectedGrouptoMove === 'Kontakty'}
                  value={'Kontakty'}
                  id={idDefaulValue.contactsID}
                >
                  Kontakt: ({contacts.length})
                </ContactOption>
                <ContactOption
                  onClick={(e) => setSelectedGrouptoMove(e.currentTarget.value)}
                  isChecked={selectedGrouptoMove === 'Wolne Numery'}
                  value={'Wolne Numery'}
                  id={idDefaulValue.freeNumberID}
                >
                  Wolne Numery: ({contactsFreeNumbers.length})
                </ContactOption>
                {allGroups}
              </Choose>
              <AcceptBox
                onClick={() => {
                  groupChangeGroup(checkedContacts, selectedGrouptoMove)
                }}
              >
                <AcceptText>Przenieś</AcceptText>
              </AcceptBox>
            </OptionBoxMoveToGroup>
            <OptionBoxCheckedContacts
              showMoreOptionCheckedContacts={showMoreOptionCheckedContacts}
            >
              <DeleteContact
                onClick={(e) => {
                  deleteManyContactsTrash(checkedContacts, trashID)

                  getAllContactsFromTrash().then((data) => {
                    if (!data) return

                    dispatch({ type: CONTACTS_TRASH, payload: data })
                  })
                  dispatch({ type: SHOW_OPTION_CONTACT, payload: '' })
                }}
              >
                Usuń
              </DeleteContact>
            </OptionBoxCheckedContacts>
          </MoreOption>
        </SelectedBox>
      ) : (
        <>
          <HeaderTitleContacts>
            <HeaderTitleContactsItem>
              {adressBook.headerTitleContacts.name}
            </HeaderTitleContactsItem>
            <HeaderTitleContactsItem>
              {adressBook.headerTitleContacts.email}
            </HeaderTitleContactsItem>

            <HeaderTitleContactsItem>
              {adressBook.headerTitleContacts.phone}
            </HeaderTitleContactsItem>

            <HeaderTitleContactsItem>
              {adressBook.headerTitleContacts.company}
            </HeaderTitleContactsItem>
          </HeaderTitleContacts>
        </>
      )}
      <Contacts>
        <CountContacts>
          {adressBook.headerTitleContacts.contact}({allContacts.length})
        </CountContacts>
        <ContainerContacts>{allContacts}</ContainerContacts>
      </Contacts>
      {isDragging && (
        <Dragging className='drg'>
          <ImgLogo
            src={Images.showAllContact}
            alt={adressBook.sideComponent.ContactTitle}
          />
          Dodaj {checkedContacts.length} kontakty do grupy.
        </Dragging>
      )}
    </Container>
  )
}
const Dragging = styled.div`
  width: 250px;
  height: 60px;
  background-color: #3c82eb;
  border-radius: 5px;
  position: absolute;
  z-index: 99999999999999999999999999999999999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  cursor: grab;

  &:active {
    cursor: grab;
  }
`
const ImgLogo = styled.img`
  width: 20px;
`
const Email = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 25%;

  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.media.md}px) {
    width: 33%;
  }
`
const ContactOption = styled.option<checkContacts>`
  :hover {
    background-color: rgb(232, 232, 232);
  }

  background-color: ${({ isChecked }) => (isChecked ? '#b7b7b7' : 'inherit')};
`
const Container = styled.div<height>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: ${({ height }) => `${height}px`};

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

const CheckedContactsOption = styled.div``
const AcceptBox = styled.div`
  position: sticky;
  bottom: 0;
  text-align: center;
  background: #fff;
  border-top: 1px solid #000;
  color: #000;
  padding: 5px;
  cursor: pointer;
`
const AcceptText = styled.div`
  padding: 5px;

  :hover {
    background-color: rgb(232, 232, 232);
  }
`
const MoreOption = styled.div`
  display: flex;
  margin-right: 10px;
`
const ContainerSelected = styled.div`
  display: flex;
  align-items: center;
`

const OptionBoxCheckedContacts = styled.div<showMoreOptionCheckedContacts>`
  display: ${({ showMoreOptionCheckedContacts }) =>
    showMoreOptionCheckedContacts ? 'block' : 'none'};
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  width: 100px;
  height: 100%;
  top: 30px;
  right: 10px;
  z-index: 99;
`
const MoveToGroup = styled.div``

const Svg = styled.svg`
  fill: red;
  right: 10px;
  margin-right: 20px;
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

  :last-child {
    @media (max-width: ${({ theme }) => theme.media.md}px) {
      display: none;
    }
  }
  :nth-child(2) {
    @media (max-width: ${({ theme }) => theme.media.sm}px) {
      display: none;
    }
  }
`

const HeaderPhone = styled.div``

const SeparatorPhone = styled.div`
  width: 1px;
  height: 15px;

  background-color: black;

  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    display: none;
  }
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
const OptionGroup = styled.option<checkContacts>`
  :hover {
    background-color: rgb(232, 232, 232);
  }

  background-color: ${({ isChecked }) => (isChecked ? '#b7b7b7' : 'inherit')};
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
  &:active {
    cursor: grabbing;
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
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    width: 33%;
  }
  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    width: 50%;
  }
`
const Company = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;

  @media (max-width: ${({ theme }) => theme.media.md}px) {
    display: none;
  }
`

const Name = styled.div`
  font-size: 14px;
  display: table-cell;
  width: 25%;
  vertical-align: middle;

  @media (max-width: ${({ theme }) => theme.media.md}px) {
    width: 30%;
  }

  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    width: 50%;
  }
`

const BoxName = styled.div`
  display: flex;
  column-gap: 10px;
`
const BoxPhone = styled.div`
  display: flex;
  column-gap: 5px;
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    flex-direction: column;
  }
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
  z-index: 99;
  display: flex;
  color: #e30613;
  align-items: center;
  margin-left: 10px;
  column-gap: 10px;
  position: sticky;
  background-color: #fff;
  bottom: 10px;
  height: 40px;
  top: 0;
  justify-content: space-between;
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

const OptionBoxMoveToGroup = styled.div<showOptionMoveToGroup>`
  display: ${({ showOptionMoveToGroup }) =>
    showOptionMoveToGroup ? 'block' : 'none'};
  position: absolute;
  background-color: #fff;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.25);
  width: 200px;
  height: 300px;
  top: 30px;
  overflow: auto;
  right: 40px;
  z-index: 99999999;
  padding: 5px;
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

const Choose = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 5px 5px 5px 10px;
  color: #000;
`
const ChooseAll = styled.div`
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: #e30613;
  }
`
const ChooseNothing = styled.div`
  font-size: 13px;
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
  height: 50px;
  top: 30px;
  right: 20px;
  z-index: 99;
`
const BoxContactOption = styled.div`
  position: relative;
  right: 40px;

  width: 5px;
  padding: 0 4px;
`
