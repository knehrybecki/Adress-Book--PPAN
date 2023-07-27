export type Dictionary = {
  welcome: {
    title: string
  }
  errorPage: {
    title: string
    link: string
  }
  loginPage: {
    HeaderTitle: string
    title: string
    user: string
    password: string
    SignIn: string
    copyright: string
  }
  adressBook: {
    sideComponent: {
      ContactTitle: string
      CreateContactTitle: string
      ManageGroupsTitle: string
      TrashTitle: string
      GroupsTitle: string
      AltGroup: string
    }
    dialog: {
      createGroup: string
      placeholder: string
      inputErrorGroup: string
      save: string
      cancel: string
      deleteGroupTitle: string
      deleteGroupText: string
      delete: string
      editGroup: string
      edit: string
    }
    flash: {
      success: string
      error: string
      close: string
    }
    quickViewContact: {
      delete: string
    }
    optionSelectedContacts: {
      selected: string
      all: string
      nothing: string
    }
    headerTitleContacts: {
      name: string
      email: string
      phone: string
      company: string
      contact: string
    }
  }
  createContact: {
    defaultContactTitle: {
      createContact: string
    }
  }
}
