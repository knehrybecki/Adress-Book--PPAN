import { HomeReducerTypes } from 'lib/types'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

export const HamburgerMenu = () => {
  const { SHOW_MENU } = HomeReducerTypes
  const dispatch = useDispatch()
  return (
    <ContainerHamburgerMenu
      onClick={() => {
        dispatch({ type: SHOW_MENU, payload: true })
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='36px'
        viewBox='0 0 24 24'
        width='36px'
        fill='#000000'
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
      </svg>
    </ContainerHamburgerMenu>
  )
}
const ContainerHamburgerMenu = styled.button`
  margin-left: 20px;
  @media (min-width: ${({ theme }) => theme.media.xs}px) {
    display: none;
  }
`
