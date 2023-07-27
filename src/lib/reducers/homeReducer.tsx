import { createAction, createReducer } from '@reduxjs/toolkit'
import { Contacts } from 'lib/types'

export const INITIAL_STATE_HOME = {
  showHeader: false,
  filteredContacts: [] as Contacts[],
  isChecked: false,
  checkedContacts: [] as Contacts[],
  showOptionSelected: false,
  showOptionContact: '',
  containerHeight: window.innerHeight - 170,
  previewContact: {} as Contacts,
  showDialogPrint: false,
  showDialogExport: false,
  showImport: false,
  showOptionMoveToGroup: false,
  showMoreOptionCheckedContacts: false,
}

const showHeaderAction = createAction<boolean>('SHOW_HEADER')
const filteredContact = createAction<[]>('SEARCH_CONTACTS')
const isChecked = createAction<boolean>('IS_CHECKED')
const checkedContacts = createAction<[]>('CHECKED_CONTACTS')
const showOptionSelected = createAction<boolean>('SHOW_OPTION_SELECTED')
const showOptionContact = createAction<string>('SHOW_OPTION_CONTACT')
const containerHeight = createAction<number>('CONTAINER_HEIGHT')
const previewContact = createAction<Contacts>('PREVIEW_CONTACT')
const showDialogPrint = createAction<boolean>('SHOW_DIALOG_PRINT')
const showImport = createAction<boolean>('SHOW_DIALOG_IMPORT')
const showDialogExport = createAction<boolean>('SHOW_DIALOG_EXPORT')
const showOptionMoveToGroup = createAction<boolean>('SHOW_OPTION_MOVE_TO_GROUP')
const showMoreOptionCheckedContacts = createAction<boolean>(
  'SHOW_MORE_OPTION_CHECKED_CONTACTS'
)
export const homeReducer = createReducer(INITIAL_STATE_HOME, (builder) => {
  builder.addCase(showHeaderAction, (state, action) => {
    state.showHeader = action.payload
  })
  builder.addCase(filteredContact, (state, action) => {
    state.filteredContacts = action.payload
  })
  builder.addCase(isChecked, (state, action) => {
    state.isChecked = action.payload
  })
  builder.addCase(checkedContacts, (state, action) => {
    state.checkedContacts = action.payload
    console.log(state.checkedContacts)
  })
  builder.addCase(showOptionSelected, (state, action) => {
    state.showOptionSelected = action.payload
  })
  builder.addCase(showOptionContact, (state, action) => {
    state.showOptionContact = action.payload
  })
  builder.addCase(containerHeight, (state, action) => {
    state.containerHeight = action.payload
  })
  builder.addCase(previewContact, (state, action) => {
    state.previewContact = action.payload
  })
  builder.addCase(showDialogPrint, (state, action) => {
    state.showDialogPrint = action.payload
  })
  builder.addCase(showImport, (state, action) => {
    state.showImport = action.payload
  })
  builder.addCase(showDialogExport, (state, action) => {
    state.showDialogExport = action.payload
  })
  builder.addCase(showOptionMoveToGroup, (state, action) => {
    state.showOptionMoveToGroup = action.payload
  })
  builder.addCase(showMoreOptionCheckedContacts, (state, action) => {
    state.showMoreOptionCheckedContacts = action.payload
  })
})
