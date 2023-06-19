import { Images } from 'assets'
import { EditGroup, LabelGroup, TrashGroup } from 'assets/svg/'
import { FlashMessage } from 'lib/components'
import { DialogComponent } from 'lib/components/Dialog'
import { RoutePath } from 'lib/config'
import { useFetch, useSide } from 'lib/hooks'
import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import { GroupReducerTypes } from 'lib/types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

export const SideComponent = () => {
  const { getName } = useSide()
  const { getAllGroups, getAllContacts, getAllContactsFromTrash } = useFetch()
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
  } = GroupReducerTypes

  const { createContactRoute, adressBookRoute } = RoutePath

  const T = PL_pl
  const { adressBook } = T

  const { selectedGroup, groups, showDialogCreateGroup, contacts } =
    useSelector((state: RootState) => state.side)

  const dispatch = useDispatch()

  const wasCalled = useRef<boolean>(false)

  const ContactGroups = groups.map((group) => (
    <React.Fragment key={group.id}>
      <BoxGroupsContactItem
        key={group.id}
        id={group.id.toString()}
        isSelected={selectedGroup === group.name}
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.nodeName !== 'svg') {
            getName(e)
          }
        }}
      >
        <LabelGroup isSelected={selectedGroup === group.name} />
        {group.name}
        <EditContactGroup isSelected={selectedGroup === group.name}>
          <EditButton
            onClick={(e) => {
              const id = e.currentTarget.closest('li')?.id
              const name = e.currentTarget.closest('li')?.innerText
              dispatch({ type: NEW_GROUP_VALUE, payload: name })
              dispatch({ type: EDIT_GROUP, payload: id })
              dispatch({ type: SHOW_DIALOG_EDIT_GROUP, payload: true })
              dispatch({ type: GET_NAME_SELECTED, payload: name })
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
  }, [
    CONTACTS,
    CONTACTS_TRASH,
    GROUPS,
    contacts,
    dispatch,
    getAllContacts,
    getAllContactsFromTrash,
    getAllGroups,
    groups,
  ])
  const navigate = useNavigate()
  return (
    <Container>
      <DialogComponent />
      <FlashMessage />
      <BoxManage>
        <ContactLogo>
          <ImgLogo
            src={Images.contactLogo}
            alt={adressBook.sideComponent.ContactTitle}
          />
          <ContactTitle>{adressBook.sideComponent.ContactTitle}</ContactTitle>
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
          isSelected={selectedGroup === 'Wolne Numery'}
        >
          {/* <ImgTrash
            src={Images.trash}
            alt={adressBook.sideComponent.TrashTitle}
          /> */}
          <TrashTitle>Wolne Numery</TrashTitle>
        </BoxContactTrash>

        <ManageGroups>
          <BoxGroupsContactTitle>
            {adressBook.sideComponent.GroupsTitle}
          </BoxGroupsContactTitle>
          <BoxGroupsContactImg
            onClick={() => {
              dispatch({
                type: SHOW_DIALOG_CREATE_GROUP,
                payload: !showDialogCreateGroup,
              })
            }}
            src={Images.plusGroup}
            alt={adressBook.sideComponent.AltGroup}
          />
        </ManageGroups>
        <BoxGrups>
          <BoxGroupsContactList>{ContactGroups}</BoxGroupsContactList>
        </BoxGrups>
      </BoxManage>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.sideBox.borderColor};
`
const ContactLogo = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  height: 50px;
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

const BoxManage = styled.div`
  height: 70%;
`
const BoxGroupsContactTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.groupTitle.color};
  font-weight: ${({ theme }) => theme.sideBox.groupTitle.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.groupTitle.fontSize};
`
const BoxGroupsContactImg = styled.img`
  width: 20px;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    border-radius: 50%;
    cursor: pointer;
  }
`

const BoxGrups = styled.div`
  height: 50vh;
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
`

const EditButton = styled.button``
const TrashButton = styled.button``
