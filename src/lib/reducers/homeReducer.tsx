import { createAction, createReducer } from '@reduxjs/toolkit'
import { Contacts } from 'lib/types'

export const INITIAL_STATE_HOME = {
  showHeader: false,
  filteredContacts: [] as Contacts[],
  isChecked: false,
  checkedContacts: [] as string[],
  showOptionSelected: false,
  showOptionContact: '',
  containerHeight: window.innerHeight - 170,
  previewContact: {} as Contacts,
}

const showHeaderAction = createAction<boolean>('SHOW_HEADER')
const filteredContact = createAction<[]>('SEARCH_CONTACTS')
const isChecked = createAction<boolean>('IS_CHECKED')
const checkedContacts = createAction<[]>('CHECKED_CONTACTS')
const showOptionSelected = createAction<boolean>('SHOW_OPTION_SELECTED')
const showOptionContact = createAction<string>('SHOW_OPTION_CONTACT')
const containerHeight = createAction<number>('CONTAINER_HEIGHT')
const previewContact = createAction<Contacts>('PREVIEW_CONTACT')
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
})
