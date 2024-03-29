export enum HomeReducerTypes {
  SHOW_HEADER = 'SHOW_HEADER',
  SEARCH_CONTACTS = 'SEARCH_CONTACTS',
  SHOW_OPTION_SELECTED = 'SHOW_OPTION_SELECTED',
  IS_CHECKED = 'IS_CHECKED',
  CHECKED_CONTACTS = 'CHECKED_CONTACTS',
  SHOW_OPTION_CONTACT = 'SHOW_OPTION_CONTACT',
  CONTAINER_HEIGHT = 'CONTAINER_HEIGHT',
  PREVIEW_CONTACT = 'PREVIEW_CONTACT',
  SHOW_DIALOG_PRINT = 'SHOW_DIALOG_PRINT',
  SHOW_DIALOG_IMPORT = 'SHOW_DIALOG_IMPORT',
  SHOW_DIALOG_EXPORT = 'SHOW_DIALOG_EXPORT',
  SHOW_MENU = 'SHOW_MENU',
  SHOW_OPTION_MOVE_TO_GROUP = 'SHOW_OPTION_MOVE_TO_GROUP',
  SHOW_MORE_OPTION_CHECKED_CONTACTS = 'SHOW_MORE_OPTION_CHECKED_CONTACTS',
}

export enum selectedGroupText {
  Kontakty = 'Kontakty',
  Kosz = 'Kosz',
  WolneNumery = 'Wolne Numery',
}

export enum idDefaulValue {
  contactsID = '000000000000',
  trashID = '111111111111',
  freeNumberID = '222222222222',
}
