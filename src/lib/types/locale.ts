import { EditGroup } from 'assets/svg/'
import { SideComponent } from 'lib/components'
export type Dictionary = {
  welcome: {
    title: string
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
  }
}
