import { RoutePath } from 'lib/config'
import { PL_pl } from 'lib/locale'
import {
  GroupReducerPayload,
  GroupReducerTypes,
  HomeReducerTypes,
} from 'lib/types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useSide = () => {
  const dispatch = useDispatch()
  const { CLICKED_GROUP, GET_NAME_SELECTED } = GroupReducerTypes
  const { SHOW_MENU } = HomeReducerTypes
  const { renameContact } = GroupReducerPayload
  const T = PL_pl
  const { adressBookRoute } = RoutePath

  const { adressBook } = T
  const navigate = useNavigate()

  const getName = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (window.innerWidth < 540) {
      dispatch({
        type: SHOW_MENU,
        payload: false,
      })
    }

    const id = e.currentTarget.closest('li')?.id
    const liElement = e.currentTarget
    const textNodes = Array.from(liElement.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.nodeValue.trim())

    const text = textNodes.join(' ')

    if (textNodes.length === 0) {
      const text = e.currentTarget.innerText

      const textPath = text.toLowerCase().replace(' ', '-')

      dispatch({ type: CLICKED_GROUP, payload: text })

      if (text === adressBook.sideComponent.ContactTitle) {
        dispatch({ type: GET_NAME_SELECTED, payload: renameContact })
        return
      }
      dispatch({ type: GET_NAME_SELECTED, payload: text })
      if (!id) {
        navigate(`${adressBookRoute}/${textPath}`)
        // location.pathname = `${adressBookRoute}/${textPath}`
      }
      if (id) {
        navigate(`${adressBookRoute}/${id}`)
        // location.pathname = `${adressBookRoute}/${id}`
      }
      return
    }

    const textPath = text.toLowerCase().replace(' ', '-')

    dispatch({ type: CLICKED_GROUP, payload: text })

    if (text === adressBook.sideComponent.ContactTitle) {
      dispatch({ type: GET_NAME_SELECTED, payload: renameContact })
      return
    }
    dispatch({ type: GET_NAME_SELECTED, payload: text })
    if (!id) {
      navigate(`${adressBookRoute}/${textPath}`)
      // location.pathname = `${adressBookRoute}/${textPath}`
    }
    if (id) {
      navigate(`${adressBookRoute}/${id}`)
      // location.pathname = `${adressBookRoute}/${id}`
    }
  }
  return { getName }
}
