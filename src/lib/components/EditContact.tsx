import { Images } from 'assets'
import { HamburgerMenu } from 'lib/components/HamburgerMenu'
import { useFetch } from 'lib/hooks'
import { RootState } from 'lib/reducers'
import { ContactType, GroupReducerTypes, HomeReducerTypes } from 'lib/types'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
type InputProps = { hasError?: boolean }
export const EditContact = () => {
  const { PREVIEW_CONTACT } = HomeReducerTypes
  const { previewContact } = useSelector((state: RootState) => state.home)
  const { getPreviewContact } = useFetch()
  const dispatch = useDispatch()
  const { HAS_ERROR } = GroupReducerTypes

  const { SHOW_HEADER } = HomeReducerTypes
  const { groups, hasError } = useSelector((state: RootState) => state.side)
  const { createGroupFetch, editContactFetch } = useFetch()
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  const [editContact, setEditContact] = useState<ContactType>()
  useEffect(() => {
    if (editContact) {
      const lastPreview = sessionStorage.getItem('previewID')
      if (!lastPreview) return

      editContactFetch(editContact, lastPreview).then((e) => {
        const newPathname = location.pathname.replace('/edit', '')

        e === 'good' ? (location.pathname = newPathname) : null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editContact])
  useEffect(() => {
    dispatch({ type: SHOW_HEADER, payload: false })
    const lastPreview = sessionStorage.getItem('previewID')
    if (!lastPreview) return

    getPreviewContact(lastPreview).then((data) => {
      if (!data) return

      dispatch({
        type: PREVIEW_CONTACT,
        payload: data,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    firstName,
    lastName,
    companyName,
    positionInCompany,
    email,
    phoneMobile,
    phoneHome,
    groupName,
  } = previewContact

  const [selectedGroup, setSelectedGroup] = useState(groupName)
  const groups2 = groups.map((item) => (
    <React.Fragment key={item.id}>
      <OptionGroup
        selected={groupName === item.name}
        value={item.name}
        key={item.id}
        id={`${item.id}`}
      >
        {item.name}
      </OptionGroup>
    </React.Fragment>
  ))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        const saveButton = saveButtonRef.current
        if (saveButton) {
          saveButton.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <>
      <Container>
        <HamburgerMenu />
        <Separator />

        <CreateContactContainer>
          <CreateContactForm>
            <ContactName>
              <ImgName src={Images.userIconCreate} />
              <FirstName>
                <InputName
                  min={1}
                  max={100}
                  type='text'
                  autoFocus
                  name='firstName'
                  required={true}
                  defaultValue={firstName}
                  placeholder='Imię'
                  hasError={hasError}
                  onChange={(e: { target: { value: string } }) => {
                    const target = e.target.value.length
                    if (target > 0) {
                      dispatch({ type: HAS_ERROR, payload: false })
                    }
                    if (target === 0) {
                      dispatch({ type: HAS_ERROR, payload: true })
                    }
                  }}
                />
              </FirstName>
              <LastName>
                <InputName
                  min={1}
                  max={100}
                  type='text'
                  name='lastName'
                  placeholder='Nazwisko'
                  defaultValue={lastName}
                />
              </LastName>
            </ContactName>
            <ContactWork>
              <ImgName src={Images.corporate} />
              <InputName
                name='companyName'
                type='text'
                defaultValue={companyName}
                min={1}
                max={100}
                placeholder='Firma'
              />
              <Position>
                <InputName
                  name='positionInCompany'
                  defaultValue={positionInCompany}
                  type='text'
                  min={1}
                  max={100}
                  placeholder='Stanowisko'
                />
              </Position>
            </ContactWork>
            <ContactEmail>
              <ImgName src={Images.emailIcon} />
              <InputName
                name='email'
                defaultValue={email}
                type='email'
                min={1}
                max={100}
                placeholder='Email'
              />
            </ContactEmail>
            <ContactPhone>
              <ImgName src={Images.callIcon} />
              <InputName
                name='phoneMobile'
                defaultValue={phoneMobile}
                type='tel'
                min={1}
                max={100}
                required={true}
                hasError={hasError}
                placeholder='Numer Telefonu'
                onChange={(e: { target: { value: string } }) => {
                  const target = e.target.value.length
                  if (target > 0) {
                    dispatch({ type: HAS_ERROR, payload: false })
                  }
                  if (target === 0) {
                    dispatch({ type: HAS_ERROR, payload: true })
                  }
                }}
              />
            </ContactPhone>
            <ContactPhone>
              <ImgName src={Images.oldCallIcon} />
              <InputName
                type='tel'
                min={1}
                max={100}
                name='phoneHome'
                defaultValue={phoneHome}
                placeholder='Numer Telefonu Stacjonarny'
              />
            </ContactPhone>
          </CreateContactForm>
          <SelectedGroup>
            <ChooseGroupTitle>
              Przydziel do grupy:
              <ChooseGroup
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <ContactOption
                  selected={groupName === 'Kontakty'}
                  value='Kontakty'
                  id='000000000000'
                >
                  kontakt
                </ContactOption>
                <ContactOption
                  selected={groupName === 'Wolne Numery'}
                  value='Wolne Numery'
                  id='222222222222'
                >
                  Wolne Numery
                </ContactOption>
                {groups2}
              </ChooseGroup>
            </ChooseGroupTitle>
            <ChooseNewGroupTitle>
              Utwórz grupe i przydziel do niej kontakt:
              <ChooseNewGroup
                name='createNewGroup'
                type='text'
                placeholder='Nowa nazwa grupy'
              />
            </ChooseNewGroupTitle>
          </SelectedGroup>
          <SaveContact
            ref={saveButtonRef}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const inputElementAll = target
                .closest('div')
                ?.querySelectorAll('input')
              const select = document.querySelector('select')
              const id = select?.selectedOptions[0]?.getAttribute(
                'id'
              ) as string
              const groupName = select?.selectedOptions[0]?.value

              inputElementAll &&
                inputElementAll.forEach((item: HTMLInputElement) => {
                  const name = item.getAttribute('name') as string
                  const value = item.value

                  if (name === 'createNewGroup' && value.length > 0) {
                    createGroupFetch(value)

                    setEditContact((prevState) => ({
                      ...prevState,
                      [name]: value,
                      group: value,
                      groupName: value,
                    }))

                    return
                  }

                  setEditContact((prevState) => ({
                    ...prevState,
                    [name]: value,
                    group: id,
                    groupName: groupName,
                  }))
                })
            }}
          >
            Zapisz
          </SaveContact>
        </CreateContactContainer>
      </Container>
    </>
  )
}
const Separator = styled.div`
  width: 90%;
  height: 1px;
  background-color: #adadad;
  margin: 20px auto;
`
const Container = styled.div`
  position: relative;
  overflow: scroll;
`
const CreateContactContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const CreateContactForm = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`
const ContactName = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
const FirstName = styled.div``
const LastName = styled.div``
const ImgName = styled.img`
  width: 25px;
  position: absolute;
  left: -32px;
  top: 2px;
`
const InputName = styled.input<InputProps>`
  width: 400px;
  height: 30px;
  border: 1px solid #c1c1c1;
  border: ${({ hasError }) =>
    hasError ? '1px solid #ff5c5c' : '1px solid #c1c1c1;'};
  padding-left: 10px;
  color: #888888;
  border-radius: 5px;
  position: relative;

  &:focus {
    outline-color: #ffed00;
    outline-width: 5px;
  }
  &::placeholder {
    color: #c1c1c1;
  }
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    width: 100%;
  }
`
const ContactWork = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
const Position = styled.div``
const ContactEmail = styled.div`
  position: relative;
`
const ContactPhone = styled.div`
  position: relative;
`
const SelectedGroup = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  }
`
const ChooseGroup = styled.select`
  width: 30px;
  border: 1px solid #e8e8e8;
  height: 30px;
  width: max-content;
  padding: 5px;
  margin-left: 10px;
`
const ChooseGroupTitle = styled.label`
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    display: flex;
    flex-direction: column;
  }
`
const ChooseNewGroup = styled.input`
  margin-left: 10px;
  width: 150px;
  height: 30px;
  border: 1px solid #c1c1c1;
  padding-left: 10px;
  color: #888888;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c1c1c1;
  }
`
const ChooseNewGroupTitle = styled.label`
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const SaveContact = styled.button`
  margin-top: 100px;
  background-color: #ff4444;
  color: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  :hover {
    background-color: #fc2c2c;
  }
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    margin-top: 20px;
    margin-bottom: 100px;
  }
`

const ContactOption = styled.option``
const OptionGroup = styled.option``
