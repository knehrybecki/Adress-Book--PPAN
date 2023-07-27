import { Images } from 'assets'

import { RootState } from 'lib/reducers'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { HomeReducerTypes } from 'lib/types'
import { usePopper } from 'lib/hooks'
import { HamburgerMenu } from 'lib/components'

type HomeContactsProps = {
  children: React.ReactNode
}

export const HomeContacts = ({ children }: HomeContactsProps) => {
  const { showHeader } = useSelector((state: RootState) => state.home)
  const { contacts } = useSelector((state: RootState) => state.side)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const { handleMouseEntryPopper, handleMouseLeavePopper } = usePopper()
  const {
    SEARCH_CONTACTS,
    SHOW_DIALOG_PRINT,
    SHOW_DIALOG_IMPORT,
    SHOW_DIALOG_EXPORT,
  } = HomeReducerTypes

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredContacts = contacts.filter((contact) => {
    const values = Object.values(contact)

    return values.some((value) =>
      String(value)
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    )
  })

  useEffect(() => {
    dispatch({ type: SEARCH_CONTACTS, payload: filteredContacts })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <Container>
      <Header show={showHeader}>
        <HamburgerMenu />
        <Search>
          <IconSearch src={Images.SearchIcon} />
          <Input
            type='search'
            min={1}
            max={100}
            placeholder='Szukaj'
            onChange={handleSearch}
          />
        </Search>
        <OptionsBox>
          <IconPrint
            onClick={() => {
              dispatch({ type: SHOW_DIALOG_PRINT, payload: true })
            }}
            aria-label='Drukuj'
            onMouseEnter={handleMouseEntryPopper}
            onMouseLeave={handleMouseLeavePopper}
            xmlns='http://www.w3.org/2000/svg'
            height='30px'
            viewBox='0 0 24 24'
            width='30px'
            fill='#000000'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z' />
            <circle cx='18' cy='11.5' r='1' />
          </IconPrint>

          <IconImport
            onClick={() => {
              dispatch({ type: SHOW_DIALOG_IMPORT, payload: true })
            }}
            aria-label='Importuj'
            onMouseEnter={handleMouseEntryPopper}
            onMouseLeave={handleMouseLeavePopper}
            xmlns='http://www.w3.org/2000/svg'
            enable-background='new 0 0 24 24'
            height='30px'
            viewBox='0 0 24 24'
            width='30px'
            fill='#000000'
          >
            <g>
              <rect fill='none' height='24' width='24' />
            </g>
            <g>
              <path d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z' />
            </g>
          </IconImport>

          <IconExport
            onClick={() => {
              dispatch({ type: SHOW_DIALOG_EXPORT, payload: true })
            }}
            aria-label='Exportuj'
            onMouseEnter={handleMouseEntryPopper}
            onMouseLeave={handleMouseLeavePopper}
            xmlns='http://www.w3.org/2000/svg'
            enable-background='new 0 0 24 24'
            height='30px'
            viewBox='0 0 24 24'
            width='30px'
            fill='#000000'
          >
            <g>
              <rect fill='none' height='24' width='24' />
            </g>
            <g>
              <path d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z' />
            </g>
          </IconExport>
        </OptionsBox>
      </Header>
      <Separator show={showHeader} />
      {children}
    </Container>
  )
}

const Container = styled.div`
  height: 100px;
  width: 83%;
  @media (max-width: ${({ theme }) => theme.media.xs}px) {
    width: 100%;
  }
`

const Header = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: space-between;

  align-items: center;
  height: 100%;
`

const Search = styled.div`
  width: 70%;
  position: relative;
  height: 50px;
  margin-left: 40px;
`
const OptionsBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-right: 40px;
`

const Input = styled.input`
  background-color: #e8e8e8;
  border-radius: 9px;
  width: 500px;
  height: 40px;
  border: none;
  padding-left: 50px;
  font-size: 15px;

  :focus {
    outline: none;
  }
  @media (max-width: ${({ theme }) => theme.media.md}px) {
    width: 90%;
  }
`

const IconSearch = styled.img`
  position: absolute;
  width: 20px;
  transform: translate(70%, 50%);
`
const IconPrint = styled.svg`
  cursor: pointer;
`
const IconImport = styled.svg`
  cursor: pointer;
`
const IconExport = styled.svg`
  cursor: pointer;
`
const Separator = styled.div<{ show: boolean }>`
  width: 90%;
  margin-top: ${(props) => (props.show ? '0' : '50px')};
`
