import { Images } from 'assets'
import { HamburgerMenu } from 'lib/components'
import { RoutePath } from 'lib/config'
import { useFetch } from 'lib/hooks'
import { RootState } from 'lib/reducers'
import { ContactType, GroupReducerTypes, HomeReducerTypes } from 'lib/types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

type InputProps = { hasError?: boolean }

export const CreateContact = () => {
  const { GET_NAME_SELECTED, CLICKED_GROUP } = GroupReducerTypes

  const { SHOW_HEADER,  } = HomeReducerTypes
  const { groups, hasError } = useSelector((state: RootState) => state.side)
  const { HAS_ERROR } = GroupReducerTypes
  const { saveContact, createGroupFetch } = useFetch()
  const dispatch = useDispatch()

  const { adressBookRoute } = RoutePath

  dispatch({ type: CLICKED_GROUP, payload: 'Utwórz Kontakt' })
  dispatch({ type: GET_NAME_SELECTED, payload: 'Utwórz Kontakt' })
  dispatch({ type: SHOW_HEADER, payload: false })

  const [newContact, setNewContact] = useState<ContactType>()
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  const groupsAll = groups.map((item) => (
    <>
      <OptionGroup value={item.name} key={item.id} id={`${item.id}`}>
        {item.name}
      </OptionGroup>
    </>
  ))

  useEffect(() => {
    if (newContact) {
      saveContact(newContact).then((e) => {
        e === 'good' ? (location.pathname = adressBookRoute) : null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newContact])
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
                />
              </LastName>
            </ContactName>
            <ContactWork>
              <ImgName src={Images.corporate} />
              <InputName
                name='companyName'
                type='text'
                defaultValue={'Piotruś Pan Sp. z o.o.'}
                min={1}
                max={100}
                placeholder='Firma'
              />
              <Position>
                <InputName
                  name='positionInCompany'
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
                placeholder='Numer Telefonu Stacjonarny'
              />
            </ContactPhone>
          </CreateContactForm>
          <SelectedGroup>
            <ChooseGroupTitle>
              Przydziel do grupy:
              <ChooseGroup>
                <ContactOption value={'Kontakty'} id='000000000000'>
                  Kontakt
                </ContactOption>
                <ContactOption value={'Wolne Numery'} id='222222222222'>
                  Wolne Numery
                </ContactOption>
                {groupsAll}
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

                    setNewContact((prevState) => ({
                      ...prevState,
                      [name]: value,
                      group: value,
                      groupName: value,
                    }))

                    return
                  }

                  setNewContact((prevState) => ({
                    ...prevState,
                    [name]: value,
                    group: id,
                    groupName: groupName,
                  }))
                })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const saveButton = e.target as HTMLElement
                saveButton.click()
              }
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
  @media (min-width: ${({ theme }) => theme.media.xs}px) {
    margin: 0;
  }
`
const Container = styled.div`
  position: relative;
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
    outline: none;
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
  border: 1px solid #c1c1c1;
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
