import { createAction, createReducer } from '@reduxjs/toolkit'
import { Contacts } from 'lib/types'

type Group = { id: string; name: string; isContacts: number }

export const INITIAL_STATE_SIDE = {
  selectedGroup: 'Kontakty',
  nameSelected: 'Książka Adresowa',
  newGroupName: '',
  deleteGroup: '',
  editGroup: '',
  showDialogCreateGroup: false,
  showDialogTrash: false,
  hasError: false,
  inputErrorText: '',
  flashSuccessText: '',
  flashErrorText: '',
  showDialogEditGroup: false,
  groups: [] as Group[],
  contacts: [] as Contacts[],
  contactsTrash: [] as Contacts[],
  contactsFreeNumbers: [] as Contacts[],
  contactsFromGroups: [] as Contacts[],
  isVisible: false,
  showBurgerMenu: true,
}

const nameSelected = createAction<string>('GET_NAME_SELECTED')
const clickedGroup = createAction<string>('CLICKED_GROUP')
const newGroupName = createAction<string>('NEW_GROUP_VALUE')
const showDialogCreateGroup = createAction<boolean>('SHOW_DIALOG_CREATE_GROUP')
const showDialogTrash = createAction<boolean>('SHOW_DIALOG_TRASH')
const showDialogEditGroup = createAction<boolean>('SHOW_DIALOG_EDIT_GROUP')
const hasError = createAction<boolean>('HAS_ERROR')
const inputError = createAction<string>('INPUT_ERROR_GROUP')
const flashSuccessText = createAction<string>('FLASH_SUCCESS_TEXT')
const groups = createAction<Group[]>('GROUPS')
const deleteGroup = createAction<string>('DELETE_GROUP')
const editGroup = createAction<string>('EDIT_GROUP')
const isVisible = createAction<boolean>('IS_VISIBLE')
const flashErrorText = createAction<string>('FLASH_ERROR_TEXT')
const contacts = createAction<Contacts[]>('CONTACTS')
const contactsTrash = createAction<Contacts[]>('CONTACTS_TRASH')
const contactsFreeNumbers = createAction<Contacts[]>('CONTACTS_FREE_NUMBERS')
const contactsFromGroups = createAction<Contacts[]>('CONTACTS_GROUPS')
const showBurgerMenu = createAction<boolean>('SHOW_MENU')

export const sideReducer = createReducer(INITIAL_STATE_SIDE, (builder) => {
  builder.addCase(nameSelected, (state, action) => {
    state.nameSelected = action.payload
  })
  builder.addCase(clickedGroup, (state, action) => {
    state.selectedGroup = action.payload
  })
  builder.addCase(newGroupName, (state, action) => {
    state.newGroupName = action.payload
  })
  builder.addCase(hasError, (state, action) => {
    state.hasError = action.payload
  })
  builder.addCase(inputError, (state, action) => {
    state.inputErrorText = action.payload
  })
  builder.addCase(flashSuccessText, (state, action) => {
    state.flashSuccessText = action.payload
  })

  builder.addCase(showDialogCreateGroup, (state, action) => {
    state.showDialogCreateGroup = action.payload
  })
  builder.addCase(showDialogTrash, (state, action) => {
    state.showDialogTrash = action.payload
  })
  builder.addCase(groups, (state, action) => {
    state.groups = action.payload
  })
  builder.addCase(contacts, (state, action) => {
    state.contacts = action.payload
  })
  builder.addCase(contactsTrash, (state, action) => {
    state.contactsTrash = action.payload
  })
  builder.addCase(deleteGroup, (state, action) => {
    state.deleteGroup = action.payload
  })
  builder.addCase(showDialogEditGroup, (state, action) => {
    state.showDialogEditGroup = action.payload
  })
  builder.addCase(editGroup, (state, action) => {
    state.editGroup = action.payload
  })
  builder.addCase(isVisible, (state, action) => {
    state.isVisible = action.payload
  })
  builder.addCase(flashErrorText, (state, action) => {
    state.flashErrorText = action.payload
  })
  builder.addCase(contactsFreeNumbers, (state, action) => {
    state.contactsFreeNumbers = action.payload
  })
  builder.addCase(contactsFromGroups, (state, action) => {
    state.contactsFromGroups = action.payload
  })

  builder.addCase(showBurgerMenu, (state, action) => {
    state.showBurgerMenu = action.payload
  })
})
