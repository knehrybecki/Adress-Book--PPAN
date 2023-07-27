import { Dictionary } from 'lib/types'

export const PL_pl: Dictionary = {
  welcome: {
    title: 'Książka Adresowa',
  },
  errorPage: {
    title: 'Page not Found!',
    link: 'Home Page',
  },
  loginPage: {
    HeaderTitle: 'Książka Adresowa',
    title: 'Logowanie',
    user: 'Użytkownik',
    password: 'Hasło',
    SignIn: 'Zaloguj Się',
    copyright: 'Copyright © 2023 - Kamil Nehrybecki',
  },
  adressBook: {
    sideComponent: {
      ContactTitle: 'Kontakty',
      CreateContactTitle: 'Utwórz Kontakt',
      ManageGroupsTitle: 'Zarządzaj',
      TrashTitle: 'Kosz',
      GroupsTitle: 'Grupy',
      AltGroup: 'Dodaj Grupe',
    },
    dialog: {
      createGroup: 'Utwórz Grupę',
      placeholder: 'Nazwa Grupy',
      inputErrorGroup: 'Wpisz nazwę grupy',
      save: 'Zapisz',
      cancel: 'Anuluj',
      deleteGroupTitle: 'Czy na pewno chcesz usunąć grupę?',
      deleteGroupText: 'W tej grupie znajduje się ',
      delete: 'Usuń',
      editGroup: 'Edytuj Grupę',
      edit: 'Edytuj',
    },
    flash: {
      success: 'Success',
      error: 'Error',
      close: 'Zamknij',
    },
    quickViewContact: {
      delete: 'Usuń',
    },
    optionSelectedContacts: {
      selected: 'Wybrane :',
      all: 'Wszystkie',
      nothing: 'Żaden',
    },
    headerTitleContacts: {
      name: 'Nazwa',
      email: 'Email',
      phone: 'Numer Telefonu',
      company: 'Stanowisko i Firma',
      contact: 'Kontakty:',
    },
  },
  createContact: {
    defaultContactTitle: {
      createContact: 'Utwórz Kontakt',
    },
  },
}
