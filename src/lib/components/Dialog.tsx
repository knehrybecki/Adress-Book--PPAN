import { useFetch } from 'lib/hooks'
import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import {
  ContactType,
  Contacts,
  GroupReducerPayload,
  GroupReducerTypes,
  HomeReducerTypes,
} from 'lib/types'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import Papa from 'papaparse'
import vCard from 'vcards-js'

type isDisabled = { isDisabled?: boolean }

export const DialogComponent = () => {
  const {
    createGroupFetch,
    getAllGroups,
    deleteGroupFromServer,
    editGroupFetch,
  } = useFetch()

  const {
    inputErrorText,
    newGroupName,
    showDialogCreateGroup,
    showDialogTrash,
    deleteGroup,
    selectedGroup,
    editGroup,
    showDialogEditGroup,
    groups,
    contacts,
    contactsFreeNumbers,
    contactsFromGroups,
  } = useSelector((state: RootState) => state.side)

  const {
    filteredContacts,
    showDialogPrint,
    checkedContacts,
    showImport,
    showDialogExport,
  } = useSelector((state: RootState) => state.home)

  const {
    GROUPS,
    FLASH_SUCCESS_TEXT,
    NEW_GROUP_VALUE,
    SHOW_DIALOG_CREATE_GROUP,
    SHOW_DIALOG_TRASH,
    SHOW_DIALOG_EDIT_GROUP,
    HAS_ERROR,
    IS_VISIBLE,
    INPUT_ERROR_GROUP,
  } = GroupReducerTypes

  const { SHOW_DIALOG_PRINT, SHOW_DIALOG_IMPORT, SHOW_DIALOG_EXPORT } =
    HomeReducerTypes
  const { stringEmpty } = GroupReducerPayload

  const T = PL_pl

  const { adressBook } = T

  const dispatch = useDispatch()
  const saveButtonDialogRef = useRef<HTMLButtonElement>(null)
  const cancelButtonDialogRef = useRef<HTMLButtonElement>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionFile, setSelectedOptionFile] = useState('')
  const [selectedGroupToPrint, setSelectedGroupToPrint] =
    useState<Contacts[]>(contacts)


  const { getAllContactsFromGroups, saveContactFromImport } = useFetch()

  const handleOptionChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedGroupToPrint(contacts)
    setSelectedOption(event.target.value)
  }
  const handleOptionChangeFile = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedGroupToPrint(contacts)
    setSelectedOptionFile(event.target.value)
  }
  const allGroups = groups.map((item) => (
    <>
      <OptionGroup value={item.name} key={item.id} id={`${item.id}`}>
        {item.name}: ({item.isContacts})
      </OptionGroup>
    </>
  ))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        const saveButton = saveButtonDialogRef.current
        if (saveButton) {
          saveButton.click()
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        const cancelButton = cancelButtonDialogRef.current
        if (cancelButton) {
          cancelButton.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const createGroup = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>{adressBook.sideComponent.AltGroup}</DialogTitle>
            <DialogInput
              minLength={1}
              maxLength={50}
              value={newGroupName}
              placeholder={adressBook.dialog.placeholder}
              autoFocus
              onChange={(e) => {
                const value = e.target.value
                dispatch({ type: NEW_GROUP_VALUE, payload: value })
              }}
            />
            {inputErrorText && <InputError>{inputErrorText}</InputError>}

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({ type: FLASH_SUCCESS_TEXT, payload: stringEmpty })
                  dispatch({ type: NEW_GROUP_VALUE, payload: stringEmpty })
                  dispatch({ type: HAS_ERROR, payload: false })
                  dispatch({
                    type: SHOW_DIALOG_CREATE_GROUP,
                    payload: !showDialogCreateGroup,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  dispatch({ type: NEW_GROUP_VALUE, payload: stringEmpty })
                  if (newGroupName.length < 1) {
                    dispatch({ type: HAS_ERROR, payload: true })
                    dispatch({
                      type: INPUT_ERROR_GROUP,
                      payload: 'Wpisz nazwę grupy',
                    })

                    return
                  }

                  createGroupFetch(newGroupName).then((data) => {
                    if (data) {
                      dispatch({ type: IS_VISIBLE, payload: true })
                      return
                    }

                    dispatch({ type: GROUPS, payload: [] })

                    getAllGroups().then((data) => {
                      if (!data) return
                      dispatch({ type: GROUPS, payload: data })
                    })

                    dispatch({
                      type: SHOW_DIALOG_CREATE_GROUP,
                      payload: !showDialogCreateGroup,
                    })
                    dispatch({ type: IS_VISIBLE, payload: true })
                  })
                }}
              >
                {adressBook.dialog.save}
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }

  const editGroupDialog = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>Zmień nazwę grupy</DialogTitle>
            <DialogInput
              minLength={1}
              maxLength={50}
              autoFocus
              value={newGroupName}
              placeholder={adressBook.dialog.placeholder}
              onChange={(e) => {
                const value = e.target.value
                dispatch({ type: NEW_GROUP_VALUE, payload: value })
              }}
            />

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({ type: FLASH_SUCCESS_TEXT, payload: stringEmpty })
                  dispatch({ type: NEW_GROUP_VALUE, payload: stringEmpty })
                  dispatch({ type: HAS_ERROR, payload: false })
                  dispatch({
                    type: SHOW_DIALOG_EDIT_GROUP,
                    payload: !showDialogEditGroup,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  dispatch({ type: NEW_GROUP_VALUE, payload: stringEmpty })

                  editGroupFetch(editGroup, selectedGroup, newGroupName)
                  dispatch({ type: GROUPS, payload: [] })

                  getAllGroups()
                    .then((data) => {
                      if (!data) return
                      dispatch({ type: GROUPS, payload: data })
                    })
                    .catch((err) => {
                      console.log(err)
                    })

                  dispatch({
                    type: SHOW_DIALOG_EDIT_GROUP,
                    payload: !showDialogEditGroup,
                  })

                  dispatch({ type: IS_VISIBLE, payload: true })
                }}
              >
                {adressBook.dialog.save}
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }

  const lengthGroup = () => {
    switch (filteredContacts.length) {
      case 1:
        return ` kontakt`
      case 2:
      case 3:
      case 4:
        return ` kontakty`
      default:
        return ` kontaktów`
    }
  }

  const deleteGroupDialog = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>{adressBook.dialog.deleteGroupTitle}</DialogTitle>
            <DialogText>
              {adressBook.dialog.deleteGroupText}
              <strong>{filteredContacts.length}</strong>
              {lengthGroup()}
            </DialogText>

            <DialogRadio>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionTrah'
                  value='DeleteWithContacts'
                  checked={selectedOption === 'DeleteWithContacts'}
                  onChange={handleOptionChange}
                />
                <RadioDot>Usuń wraz ze wszystkimi kontaktami</RadioDot>
              </DialogLabel>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionTrah'
                  value='DeleteOnlyGroup'
                  checked={selectedOption === 'DeleteOnlyGroup'}
                  onChange={handleOptionChange}
                />
                <RadioDot>Usuń tylko grupę</RadioDot>
              </DialogLabel>
            </DialogRadio>

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({
                    type: SHOW_DIALOG_TRASH,
                    payload: !showDialogTrash,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  if (selectedOption === 'DeleteWithContacts') {
                    const withContacts = true
                    deleteGroupFromServer(deleteGroup, withContacts)
                  }

                  if (selectedOption === 'DeleteOnlyGroup') {
                    const withContacts = false
                    deleteGroupFromServer(deleteGroup, withContacts)
                  }

                  dispatch({ type: GROUPS, payload: [] })

                  getAllGroups().then((data) => {
                    dispatch({ type: GROUPS, payload: data })
                  })
                  dispatch({
                    type: SHOW_DIALOG_TRASH,
                    payload: !showDialogTrash,
                  })
                  dispatch({ type: IS_VISIBLE, payload: true })
                }}
              >
                {adressBook.dialog.delete}
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }
  const printBox = (contact: Contacts) => (
    <>
      <PrintContainer
        style={{
          fontSize: 12,
        }}
        key={contact.id}
      >
        <div
          className='PersonName'
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            padding: '5 0',
          }}
        >
          {contact.firstName} {contact.lastName}
        </div>
        <PrintCompany
          style={{
            padding: '5 0',
          }}
        >
          {contact.companyName}, {contact.positionInCompany}
        </PrintCompany>
        <PrintOtherPersonInfo>
          {contact.email && (
            <>
              <PrintEmail
                style={{
                  padding: '5 0',
                  display: 'flex',
                  columnGap: 20,
                }}
              >
                <div>E-mail:</div>
                <span> {contact.email}</span>
              </PrintEmail>
            </>
          )}
          <PrintBothPhone
            style={{
              padding: '5 0',
              display: 'flex',
              columnGap: 20,
            }}
          >
            <PrintMobile>Telefon:</PrintMobile>
            <div>{contact.phoneMobile}</div>
            {contact.phoneHome && (
              <PrintHomePhone>
                Telefon Stacjonarny: {contact.phoneHome}
              </PrintHomePhone>
            )}
          </PrintBothPhone>
        </PrintOtherPersonInfo>
        <SeparatorPrint
          style={{
            borderTop: '1px solid lightgray',
            height: 0,
            margin: 3,
            overflow: 'hidden',
          }}
        />
      </PrintContainer>
    </>
  )

  const printDialog = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>Drukuj kontakty</DialogTitle>
            <DialogText></DialogText>

            <DialogRadio>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionPrint'
                  value='PrintSelectedContacts'
                  checked={selectedOption === 'PrintSelectedContacts'}
                  disabled={checkedContacts.length === 0}
                  onChange={handleOptionChange}
                />
                <RadioDot isDisabled={checkedContacts.length === 0}>
                  Wybrane kontakty (<strong>{checkedContacts.length}</strong>)
                </RadioDot>
              </DialogLabel>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionPrint'
                  value='PrintFromGroup'
                  checked={selectedOption === 'PrintFromGroup'}
                  onChange={handleOptionChange}
                />

                <SelectedGroup>
                  <ChooseGroup
                    onChange={(e) => {
                      const value = e.currentTarget.value

                      switch (value) {
                        case 'Kontakty':
                          setSelectedGroupToPrint(contacts)
                          break
                        case 'Wolne Numery':
                          setSelectedGroupToPrint(contactsFreeNumbers)
                          break
                        case value:
                          if (
                            value !== 'Kontakty' &&
                            value !== 'Wolne Numery'
                          ) {
                            getAllContactsFromGroups(value).then((data) => {
                              if (!data) return

                              setSelectedGroupToPrint(data)
                            })
                          }
                          break
                        default:
                          setSelectedGroupToPrint(contactsFromGroups)
                          break
                      }
                    }}
                  >
                    <ContactOption value={'Kontakty'} id='000000000000'>
                      Kontakt: ({contacts.length})
                    </ContactOption>
                    <ContactOption value={'Wolne Numery'} id='222222222222'>
                      Wolne Numery: ({contactsFreeNumbers.length})
                    </ContactOption>
                    {allGroups}
                  </ChooseGroup>
                </SelectedGroup>
              </DialogLabel>
            </DialogRadio>

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({
                    type: SHOW_DIALOG_PRINT,
                    payload: !showDialogPrint,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  if (selectedOption === 'PrintSelectedContacts') {
                    const printContent = checkedContacts.map((contact) =>
                      printBox(contact)
                    )

                    const printHtml = ReactDOMServer.renderToString(
                      <html>
                        <head>
                          <title>Kontakty</title>
                        </head>
                        <body>{printContent}</body>
                      </html>
                    )

                    const printWindow = window.open('', '_blank')
                    if (printWindow) {
                      printWindow.document.write(printHtml)
                      printWindow.document.close()
                      printWindow.print()
                    }
                  }

                  if (selectedOption === 'PrintFromGroup') {
                    const printContent = selectedGroupToPrint.map((contact) =>
                      printBox(contact)
                    )

                    const printHtml = ReactDOMServer.renderToString(
                      <html>
                        <head>
                          <title>Kontakty</title>
                        </head>
                        <body>{printContent}</body>
                      </html>
                    )

                    const printWindow = window.open('', '_blank')
                    if (printWindow) {
                      printWindow.document.write(printHtml)
                      printWindow.document.close()
                      printWindow.print()
                    }
                  }

                  dispatch({
                    type: SHOW_DIALOG_PRINT,
                    payload: !showDialogPrint,
                  })
                  dispatch({ type: IS_VISIBLE, payload: true })
                }}
              >
                {/* {adressBook.dialog.delete} */}
                Drukuj
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }

  const [fileName, setFileName] = useState('')
  const [contactsImport, setContactsImport] = useState<ContactType>()

  const importContact = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>Importowanie Kontaktów</DialogTitle>
            <DialogText>
              Aby zaimportować kontakty, wybierz plik CSV.
            </DialogText>
            <DialogInputFile
              type='file'
              accept='.csv'
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0]

                const name = file?.name as string

                setFileName(name)

                if (file) {
                  const reader = new FileReader()

                  reader.onload = (event) => {
                    const csvData = event.target?.result

                    if (csvData) {
                      Papa.parse(csvData as string, {
                        header: true,
                        encoding: 'utf8',
                        complete: (results) => {
                          const contacts: Contacts[] = []

                          results.data.forEach((value) => {
                            const keys = Object.keys(value)

                            if (keys.length > 0) {
                              const firstName = value[keys[0]]
                              const lastName = value[keys[1]]
                              const email = value[keys[2]]
                              const phoneMobile = value[keys[3]]
                              const phoneHome = value[keys[4]]
                              const companyName = value[keys[5]]
                                ? value[keys[5]]
                                : 'Piotruś Pan Sp. z o.o.'
                              const positionInCompany = value[keys[6]]
                              const group = '000000000000'
                              const groupName = 'Kontaty'
                              const id = ''

                              const contact = {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                phoneMobile: phoneMobile,
                                phoneHome: phoneHome,
                                companyName: companyName,
                                positionInCompany: positionInCompany,
                                group: group,
                                id: id,
                                groupName: groupName,
                              }

                              contacts.push(contact)
                              setContactsImport(contacts)
                            }
                          })
                        },
                      })
                    }
                  }

                  reader.readAsText(file)
                }
              }}
            />
            <DialogInputFileBox>
              <DialogInputFileButton
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click()
                  }
                }}
              >
                Wybierz Plik
              </DialogInputFileButton>
              <Span>{fileName}</Span>
            </DialogInputFileBox>

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({ type: FLASH_SUCCESS_TEXT, payload: stringEmpty })
                  dispatch({ type: HAS_ERROR, payload: false })

                  dispatch({
                    type: SHOW_DIALOG_IMPORT,
                    payload: !showImport,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  saveContactFromImport(contactsImport).then((e) => {
                    e === 'good' ? location.reload() : null
                  })

                  dispatch({
                    type: SHOW_DIALOG_IMPORT,
                    payload: !showImport,
                  })

                  dispatch({ type: IS_VISIBLE, payload: true })
                }}
              >
                Importuj
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }

  const exportFileCSV = (Contacts) => {
    const filterToCSV = Contacts.map((contact) => {
      const {
        firstName,
        lastName,
        email,
        positionInCompany,
        phoneHome,
        phoneMobile,
      } = contact

      return {
        firstName,
        lastName,
        email,
        positionInCompany,
        phoneHome,
        phoneMobile,
      }
    })

    const csv = Papa.unparse(filterToCSV)

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Contacts.csv'
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const exportFilevCard = (Contacts) => {
    const group = []
    Contacts.map((contact) => {
      const {
        firstName,
        lastName,
        email,
        positionInCompany,
        phoneHome,
        phoneMobile,
        groupName,
      } = contact

      const vcard = vCard()

      vcard.firstName = firstName
      vcard.lastName = lastName
      vcard.email = email
      vcard.title = positionInCompany
      vcard.homePhone = phoneHome
      vcard.cellPhone = phoneMobile
      vcard.group = groupName

      const vcardString = vcard.getFormattedString()

      group.push(vcardString)
    })
    const groupJoin = group.join('')

    const blob = new Blob([groupJoin], {
      type: 'text/vcf',
    })

    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = 'Contacts.vcf'
    downloadLink.click()
  }

  const exportDialog = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>Eksportuj kontakty</DialogTitle>
            <DialogText></DialogText>

            <DialogRadio>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionExport'
                  value='ExportSelectedContacts'
                  checked={selectedOption === 'ExportSelectedContacts'}
                  disabled={checkedContacts.length === 0}
                  onChange={handleOptionChange}
                />
                <RadioDot isDisabled={checkedContacts.length === 0}>
                  Wybrane kontakty (<strong>{checkedContacts.length}</strong>)
                </RadioDot>
              </DialogLabel>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionExport'
                  value='ExportFromGroup'
                  checked={selectedOption === 'ExportFromGroup'}
                  onChange={handleOptionChange}
                />

                <SelectedGroup>
                  <ChooseGroup
                    onChange={(e) => {
                      const value = e.currentTarget.value
                      switch (value) {
                        case 'Kontakty':
                          setSelectedGroupToPrint(contacts)
                          break
                        case 'Wolne Numery':
                          setSelectedGroupToPrint(contactsFreeNumbers)
                          break
                        case value:
                          if (
                            value !== 'Kontakty' &&
                            value !== 'Wolne Numery'
                          ) {
                            getAllContactsFromGroups(value).then((data) => {
                              if (!data) return

                              setSelectedGroupToPrint([data])
                            })
                          }
                          break
                        default:
                          setSelectedGroupToPrint(contactsFromGroups)
                          break
                      }
                    }}
                  >
                    <ContactOption value={'Kontakty'} id='000000000000'>
                      Kontakt: ({contacts.length})
                    </ContactOption>
                    <ContactOption value={'Wolne Numery'} id='222222222222'>
                      Wolne Numery: ({contactsFreeNumbers.length})
                    </ContactOption>
                    {allGroups}
                  </ChooseGroup>
                </SelectedGroup>
              </DialogLabel>
            </DialogRadio>
            <DialogRadio>
              <DialogSubText>Eksportuj jako</DialogSubText>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionExportFile'
                  value='ExportCSV'
                  defaultChecked={true}
                  checked={selectedOptionFile === 'ExportCSV'}
                  onChange={handleOptionChangeFile}
                />
                <RadioDot>Do pliku .CSV</RadioDot>
              </DialogLabel>
              <DialogLabel>
                <RadioInput
                  type='radio'
                  name='optionExportFile'
                  value='ExportvCard'
                  checked={selectedOptionFile === 'ExportvCard'}
                  onChange={handleOptionChangeFile}
                />
                <RadioDot>.vCard</RadioDot>
              </DialogLabel>
            </DialogRadio>

            <DialogButton>
              <CloseDialog
                ref={cancelButtonDialogRef}
                onClick={() => {
                  dispatch({
                    type: SHOW_DIALOG_EXPORT,
                    payload: !showDialogExport,
                  })
                }}
              >
                {adressBook.dialog.cancel}
              </CloseDialog>
              <DialogAccept
                ref={saveButtonDialogRef}
                onClick={() => {
                  if (selectedOption === 'ExportSelectedContacts') {
                    if (selectedOptionFile === 'ExportCSV') {
                      exportFileCSV(checkedContacts)
                    }

                    if (selectedOptionFile === 'ExportvCard') {
                      exportFilevCard(checkedContacts)
                    }
                  }

                  if (selectedOption === 'ExportFromGroup') {
                    if (selectedOptionFile === 'ExportCSV') {
                      console.log(selectedGroupToPrint)
                      exportFileCSV(selectedGroupToPrint)
                    }

                    if (selectedOptionFile === 'ExportvCard') {
                      exportFilevCard(selectedGroupToPrint)
                    }
                  }

                  dispatch({
                    type: SHOW_DIALOG_EXPORT,
                    payload: !showDialogExport,
                  })
                  dispatch({ type: IS_VISIBLE, payload: true })
                }}
              >
                {/* {adressBook.dialog.delete} */}
                Eksportuj
              </DialogAccept>
            </DialogButton>
          </Dialog>
        </ContainerDialog>
      </DialogBackground>
    )
  }
  return (
    <>
      {showDialogCreateGroup && createGroup()}
      {showDialogTrash && deleteGroupDialog()}
      {showDialogEditGroup && editGroupDialog()}
      {showDialogPrint && printDialog()}
      {showImport && importContact()}
      {showDialogExport && exportDialog()}
    </>
  )
}
const Span = styled.span`
  margin-left: 5px;
`
const DialogInputFileBox = styled.div`
  font-size: 12px;
`
const DialogSubText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 25px 5px 20px 5px;
`

const DialogInputFileButton = styled.button`
  background-color: #ff4444;
  color: #fff;
  padding: 5px 15px;
  margin-left: 20px;
  font-size: 12px;
  width: fit-content;
  border-radius: 3px;
  margin-bottom: 20px;
`

const DialogInputFile = styled.input`
  display: none;
`

const OptionGroup = styled.option``

const ContactOption = styled.option``
const ChooseGroup = styled.select`
  width: 30px;
  border: 1px solid #c1c1c1;
  height: 30px;
  width: max-content;
  padding: 5px;
  margin-left: 10px;
`
const SelectedGroup = styled.div``
const DialogBackground = styled.div`
  width: 100%;
  position: absolute;
  background: rgba(82, 77, 77, 0.5);
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99999;
`
const ContainerDialog = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
`

const Dialog = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  background: #fff;
  min-height: 100px;
  max-height: 300px;
  padding: 20px;
  position: relative;
`
const DialogTitle = styled.h3`
  font-weight: 400;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`
const DialogInput = styled.input`
  border-bottom: 1px solid #000;
  padding-left: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 12px;

  :focus {
    outline: none;
  }
`
const CloseDialog = styled.button`
  :hover {
    cursor: pointer;
    color: #000;
  }
`
const DialogAccept = styled.button`
  padding-left: 10px;
  font-size: 44eE4E;

  :hover {
    cursor: pointer;
    color: #000;
  }
`
const DialogButton = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
  align-self: flex-end;
  color: #4e4e4e;
`
const InputError = styled.div`
  font-size: 10px;
  position: absolute;
  bottom: 35px;
  color: red;
`
const DialogText = styled.div`
  font-size: 13px;
  margin: 15px;
`
const DialogRadio = styled.div``
const RadioDot = styled.div<isDisabled>`
  padding-left: 10px;
  color: ${({ isDisabled }) => (isDisabled ? 'gray' : '#000')};
`
const DialogLabel = styled.label`
  margin-top: 5px;
  display: flex;
  font-size: 13px;
`
const RadioInput = styled.input``

const PrintContainer = styled.div`
  font-size: 12px;
`
const PrintCompany = styled.div``

const PrintOtherPersonInfo = styled.div``

const PrintEmail = styled.div``

const PrintBothPhone = styled.div``
const PrintMobile = styled.div``
const PrintHomePhone = styled.div``
const SeparatorPrint = styled.div`
  border-top: 1px solid lightgray;
  height: 0;
  margin: 3px;
  overflow: hidden;
`
