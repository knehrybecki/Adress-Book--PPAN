import { Images } from 'assets'
import { EditGroup, LabelGroup, TrashGroup } from 'assets/svg/'
import { FlashMessage } from 'lib/components'
import { DialogComponent } from 'lib/components/Dialog'
import { RoutePath } from 'lib/config'
import { useFetch, usePopper, useSide } from 'lib/hooks'
import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import { GroupReducerTypes, HomeReducerTypes } from 'lib/types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import React from 'react'
import styled from 'styled-components'

type height = { height: number }

export const SideComponent = () => {
  const { getName } = useSide()
  const {
    getAllGroups,
    getAllContacts,
    getAllContactsFromTrash,
    getAllContactsFromFreeNumbers,
    getAllContactsFromGroups,
    groupChangeGroup,
  } = useFetch()

  const {
    DELETE_GROUP,
    GROUPS,
    SHOW_DIALOG_CREATE_GROUP,
    SHOW_DIALOG_TRASH,
    SHOW_DIALOG_EDIT_GROUP,
    GET_NAME_SELECTED,
    EDIT_GROUP,
    NEW_GROUP_VALUE,
    CLICKED_GROUP,
    CONTACTS,
    CONTACTS_TRASH,
    CONTACTS_FREE_NUMBERS,
    CONTACTS_GROUPS,
  } = GroupReducerTypes

  const { SHOW_MENU } = HomeReducerTypes

  const { createContactRoute, adressBookRoute } = RoutePath

  const T = PL_pl
  const { adressBook } = T

  const {
    selectedGroup,
    groups,
    showDialogCreateGroup,
    contacts,
    showBurgerMenu,
  } = useSelector((state: RootState) => state.side)

  const dispatch = useDispatch()
  const { handleMouseEntryPopper, handleMouseLeavePopper } = usePopper()
  const wasCalled = useRef<boolean>(false)

  const ContactGroups = groups.map((group) => (
    <React.Fragment key={group.id}>
      <BoxGroupsContactItem
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDragEnter={(e) => {
          e.target.style.backgroundColor = '#FFED00'
        }}
        onDragLeave={(e) => {
          e.target.style.backgroundColor = 'inherit'
        }}
        onDrop={(e) => {
          e.preventDefault()
          const data = e.dataTransfer.getData('text/plain')
          const checkedContacts = JSON.parse(data)

          groupChangeGroup(checkedContacts, group.name)

          e.target.style.backgroundColor = 'inherit'
          location.reload()
        }}
        key={group.id}
        id={group.id.toString()}
        isSelected={selectedGroup === group.name}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.nodeName !== 'svg') {
            getName(e)
          }

          getAllContactsFromGroups(group.name).then((data) => {
            if (!data) return
            dispatch({ type: CONTACTS_GROUPS, payload: data })
          })
        }}
      >
        <LabelGroup isSelected={selectedGroup === group.name} />
        {group.name}
        <EditContactGroup isSelected={selectedGroup === group.name}>
          <EditButton
            onClick={(e) => {
              const id = e.currentTarget.closest('li')?.id

              const liElement = e.currentTarget.closest('li')
              const textNodes = Array.from(liElement.childNodes)
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.nodeValue.trim())

              const text = textNodes.join(' ')

              dispatch({ type: NEW_GROUP_VALUE, payload: text })
              dispatch({ type: EDIT_GROUP, payload: id })
              dispatch({ type: SHOW_DIALOG_EDIT_GROUP, payload: true })
              dispatch({ type: GET_NAME_SELECTED, payload: text })
            }}
          >
            <EditGroup />
          </EditButton>
          <TrashButton
            onClick={(e) => {
              const id = e.currentTarget.closest('li')?.id

              dispatch({ type: SHOW_DIALOG_TRASH, payload: true })
              dispatch({ type: DELETE_GROUP, payload: id })
            }}
          >
            <TrashGroup />
          </TrashButton>
        </EditContactGroup>
        <CountContactGroup isSelected={selectedGroup === group.name}>
          {group.isContacts}
        </CountContactGroup>
      </BoxGroupsContactItem>
    </React.Fragment>
  ))

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

  const navigate = useNavigate()

  const [height, setHeight] = useState(window.innerHeight / 2 - 7)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight / 2 - 7
      const width = window.innerWidth > 548
      setWidth(width)

      if (width) {
        dispatch({
          type: SHOW_MENU,
          payload: true,
        })
      }
      if (!width) {
        dispatch({
          type: SHOW_MENU,
          payload: false,
        })
      }
      if (window.innerWidth < 768) {
        setHeight(height - 55)
        return
      }
      setHeight(height)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nodeRef = useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={showBurgerMenu}
      unmountOnExit
      timeout={1000}
      classNames='slide'
    >
      <Container ref={nodeRef}>
        <DialogComponent />
        <FlashMessage />
        <BoxManage>
          <ContactLogo>
            <ImgLogo
              src={Images.contactLogo}
              alt={adressBook.sideComponent.ContactTitle}
            />
            <ContactTitle>{adressBook.sideComponent.ContactTitle}</ContactTitle>
            <CloseMenu
              onClick={() => {
                if (window.innerWidth < 548) {
                  dispatch({
                    type: SHOW_MENU,
                    payload: false,
                  })
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#ff0000'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
              </svg>
            </CloseMenu>
          </ContactLogo>
          <CreateContact
            isSelected={
              selectedGroup === adressBook.sideComponent.CreateContactTitle
            }
            onClick={() => {
              navigate(createContactRoute, { replace: true })

              dispatch({
                type: CLICKED_GROUP,
                payload: 'Utwórz Kontakt',
              })
              dispatch({ type: GET_NAME_SELECTED, payload: 'Utwórz Kontakt' })
              if (window.innerWidth < 548) {
                dispatch({
                  type: SHOW_MENU,
                  payload: false,
                })
              }
            }}
          >
            <ImgAdd
              src={Images.addContact}
              alt={adressBook.sideComponent.CreateContactTitle}
            />
            <CreateContactTile>
              {adressBook.sideComponent.CreateContactTitle}
            </CreateContactTile>
          </CreateContact>
          <BoxContact
            onClick={(e) => {
              getName(e)
              navigate(adressBookRoute, { replace: true })
            }}
            isSelected={selectedGroup === adressBook.sideComponent.ContactTitle}
          >
            <ImgShowAll
              src={Images.showAllContact}
              alt={adressBook.sideComponent.ContactTitle}
            />
            <ShowAllContactsTitle>
              {adressBook.sideComponent.ContactTitle}
            </ShowAllContactsTitle>
          </BoxContact>
          <ManageContacts>
            <ManageGroupsTitle>
              {adressBook.sideComponent.ManageGroupsTitle}
            </ManageGroupsTitle>
          </ManageContacts>

          <BoxContactTrash
            onClick={getName}
            isSelected={selectedGroup === adressBook.sideComponent.TrashTitle}
          >
            <ImgTrash
              src={Images.trash}
              alt={adressBook.sideComponent.TrashTitle}
            />
            <TrashTitle>{adressBook.sideComponent.TrashTitle}</TrashTitle>
          </BoxContactTrash>
          <BoxContactTrash
            onClick={getName}
            onDragOver={(e) => {
              e.preventDefault()
            }}
            onDragEnter={(e) => {
              e.target.style.backgroundColor = '#FFED00'
            }}
            onDragLeave={(e) => {
              e.target.style.backgroundColor = 'inherit'
            }}
            onDrop={(e) => {
              e.preventDefault()
              const data = e.dataTransfer.getData('text/plain')
              const checkedContacts = JSON.parse(data)

              groupChangeGroup(checkedContacts, 'Wolne Numery')

              e.target.style.backgroundColor = 'inherit'
              location.reload()
            }}
            isSelected={selectedGroup === 'Wolne Numery'}
          >
            <TrashTitle>Wolne Numery</TrashTitle>
          </BoxContactTrash>

          <ManageGroups>
            <BoxGroupsContactTitle>
              {adressBook.sideComponent.GroupsTitle}
            </BoxGroupsContactTitle>
            <BoxGroupsContactImg
              aria-label='Dodaj grupę'
              onMouseEnter={handleMouseEntryPopper}
              onMouseLeave={handleMouseLeavePopper}
              onClick={() => {
                dispatch({
                  type: SHOW_DIALOG_CREATE_GROUP,
                  payload: !showDialogCreateGroup,
                })
                if (width) {
                  dispatch({
                    type: SHOW_MENU,
                    payload: true,
                  })
                }
              }}
              src={Images.plusGroup}
              alt={adressBook.sideComponent.AltGroup}
            />
          </ManageGroups>
          <BoxGrups height={height}>
            <BoxGroupsContactList>{ContactGroups}</BoxGroupsContactList>
          </BoxGrups>
        </BoxManage>
      </Container>
    </CSSTransition>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  width: 260px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.sideBox.borderColor};

  @media (max-width: ${({ theme }) => theme.media.xs}px) {
    position: absolute;
    width: 100%;
    z-index: 9999;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 7px;
  }

  &.slide-enter {
    left: -460px;
  }
  &.slide-enter-active {
    left: 0px;
    transition: left 1s ease-in-out;
  }
  &.slide {
    /* left: -260px; */
  }
  &.slide-exit {
    left: 0px;
  }
  &.slide-exit-active {
    left: -460px;
    transition: left 1s ease-in-out;
  }
`

const CloseMenu = styled.button`
  position: absolute;
  right: -2px;
  top: -5px;
  font-size: 25px;

  @media (min-width: ${({ theme }) => theme.media.xs}px) {
    display: none;
  }
`
const ContactLogo = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`
const ImgLogo = styled.img`
  width: 40px;
`
const ContactTitle = styled.h2`
  color: ${({ theme }) => theme.sideBox.title.color};
  font-weight: 400;
  font-size: ${({ theme }) => theme.sideBox.title.fontSize};
  text-align: center;
`
const CreateContact = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  margin: 15px auto;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.4);
  border-radius: 25px;
  width: 60%;
  height: 40px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.sideBox.group.selectedColor : 'transparent'};

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    cursor: pointer;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.media.sm}px) {
    width: 75%;
  }
`
const CreateContactTile = styled.div`
  color: ${({ theme }) => theme.sideBox.createContact.color};
  font-weight: ${({ theme }) => theme.sideBox.createContact.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.createContact.fontSize};
`

const ImgAdd = styled.img`
  width: 20px;
`
const BoxContact = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  border-radius: 0 25px 25px 0;
  height: 35px;
  margin-top: 10px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.sideBox.group.selectedColor : 'transparent'};

  :hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? 'none' : theme.sideBox.group.selectedColorHover};
    cursor: pointer;
  }
`
const BoxContactTrash = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  border-radius: 0 25px 25px 0;
  height: 35px;
  margin-top: 10px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.sideBox.group.selectedColor : 'transparent'};

  :hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? 'none' : theme.sideBox.group.selectedColorHover};
    cursor: pointer;
  }
`
const ImgShowAll = styled.img`
  width: 20px;
`
const ShowAllContactsTitle = styled.div``

const ManageContacts = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0 0 10px;
`
const ManageGroupsTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.groupTitle.color};
  font-weight: ${({ theme }) => theme.sideBox.groupTitle.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.groupTitle.fontSize};
`
const ImgTrash = styled.img`
  width: 20px;
`
const TrashTitle = styled.div``

const ManageGroups = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  align-items: center;
  height: 35px;
`

const BoxManage = styled.div``
const BoxGroupsContactTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.groupTitle.color};
  font-weight: ${({ theme }) => theme.sideBox.groupTitle.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.groupTitle.fontSize};
`
const BoxGroupsContactImg = styled.img`
  width: 20px;
  padding: 5px;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    border-radius: 50%;
    cursor: pointer;
  }
`

const BoxGrups = styled.div<height>`
  height: ${({ height }) => height}px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: inherit;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`
const BoxGroupsContactList = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
`
const CountContactGroup = styled.div<{ isSelected: boolean }>`
  display: flex;
  top: 8px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  opacity: ${({ isSelected }) => (isSelected ? '0' : '1')};
`
const EditContactGroup = styled.div<{ isSelected: boolean }>`
  display: flex;
  top: 1px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
`
const BoxGroupsContactItem = styled.li<{ isSelected: boolean }>`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  border-radius: 0 25px 25px 0;
  height: 35px;
  margin-top: 10px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.sideBox.group.selectedColor : 'transparent'};
  position: relative;

  :hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? 'none' : theme.sideBox.group.selectedColorHover};
    cursor: pointer;
  }

  :hover ${EditContactGroup} {
    opacity: 1;
  }
  :hover ${CountContactGroup} {
    opacity: 0;
  }
`

const EditButton = styled.button``
const TrashButton = styled.button``
