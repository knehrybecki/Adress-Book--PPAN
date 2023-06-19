import { useFetch } from 'lib/hooks'
import { PL_pl } from 'lib/locale'
import { RootState } from 'lib/reducers'
import { GroupReducerPayload, GroupReducerTypes } from 'lib/types'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

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
  } = useSelector((state: RootState) => state.side)
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
  const { stringEmpty } = GroupReducerPayload

  const T = PL_pl

  const { adressBook } = T

  const dispatch = useDispatch()

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
              onChange={(e) => {
                const value = e.target.value
                dispatch({ type: NEW_GROUP_VALUE, payload: value })
              }}
            />
            {inputErrorText && <InputError>{inputErrorText}</InputError>}

            <DialogButton>
              <CloseDialog
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
                    console.log(data)
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
            <DialogTitle>{adressBook.sideComponent.AltGroup}</DialogTitle>
            <DialogInput
              minLength={1}
              maxLength={50}
              value={newGroupName}
              placeholder={adressBook.dialog.placeholder}
              onChange={(e) => {
                const value = e.target.value
                dispatch({ type: NEW_GROUP_VALUE, payload: value })
              }}
            />

            <DialogButton>
              <CloseDialog
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

  const deleteGroupDialog = () => {
    return (
      <DialogBackground>
        <ContainerDialog>
          <Dialog>
            <DialogTitle>{adressBook.dialog.deleteGroupTitle}</DialogTitle>
            <DialogText>{adressBook.dialog.deleteGroupText}</DialogText>
            <DialogButton>
              <CloseDialog
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
                onClick={() => {
                  deleteGroupFromServer(deleteGroup)

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

  return (
    <>
      {showDialogCreateGroup && createGroup()}
      {showDialogTrash && deleteGroupDialog()}
      {showDialogEditGroup && editGroupDialog()}
    </>
  )
}

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
  height: 100px;
  padding: 20px;
  position: relative;
`
const DialogTitle = styled.h3`
  font-weight: 400;
  font-size: 15px;
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
const DialogText = styled.div``
