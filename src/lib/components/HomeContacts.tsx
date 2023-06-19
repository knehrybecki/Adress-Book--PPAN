import { Images } from 'assets'

import { RootState } from 'lib/reducers'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { HomeReducerTypes } from 'lib/types'

type HomeContactsProps = {
  children: React.ReactNode
}

export const HomeContacts = ({ children }: HomeContactsProps) => {
  const { showHeader } = useSelector((state: RootState) => state.home)
  const { contacts } = useSelector(
    (state: RootState) => state.side
  )
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const { SEARCH_CONTACTS } = HomeReducerTypes

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
          <IconPrint src={Images.printIcon} />
          <IconImport src={Images.importIcon} />
          <IconExport src={Images.exportIcon} />
        </OptionsBox>
      </Header>
      <Separator show={showHeader} />
      {children}
    </Container>
  )
}

const Container = styled.div`
  height: 100px;
  width: 80%;
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
`

const IconSearch = styled.img`
  position: absolute;
  width: 20px;
  transform: translate(70%, 50%);
`
const IconPrint = styled.img`
  width: 30px;
  cursor: pointer;
`
const IconImport = styled.img`
  width: 40px;
  cursor: pointer;
`
const IconExport = styled.img`
  width: 35px;
  cursor: pointer;
`
const Separator = styled.div<{ show: boolean }>`
  width: 90%;
  margin-top: ${(props) => (props.show ? '0' : '50px')};
  /* height: 1px;
  background-color: #adadad;
  margin: 0 auto; */
`

// const ContactContainer = styled.div``
// const ContactTitle = styled.div``
// const ContactName = styled.div``
// const ContactEmail = styled.div``
// const ContactPhone = styled.div``
// const ContactPhoneTitle = styled.div``
// const BothPhone = styled.div``
// const ContactWork = styled.div``
// const ContactWorkTitle = styled.div``
// const ContactList = styled.div``
// const ContactItem = styled.div``
