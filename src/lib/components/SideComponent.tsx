import { Images } from 'assets'
import styled from 'styled-components'

export const SideComponent = () => {
  const groups = [
    'IT',
    'HR',
    'Księgowość',
    'Sprzedaż',
    'Marketing',
    'Zarząd',
    'test',
    'biuro',
    'IT',
    'HR',
    'Księgowość',
    'Sprzedaż',
    'Marketing',
    'Zarząd',
    'test',
    'biuro',
  ]

  const ContactGroups = groups.map((group) => (
    <BoxGroupsContactItem>{group}</BoxGroupsContactItem>
  ))

  return (
    <Container>
      <BoxManage>
        <ContactLogo>
          <ImgLogo src={Images.contactLogo} alt='Kontakty' />
          <ContactTitle>Kontakty</ContactTitle>
        </ContactLogo>
        <CreateContact>
          <ImgAdd src={Images.addContact} alt='Utwórz kontakt' />
          <CreateContactTile>Utwórz kontakt</CreateContactTile>
        </CreateContact>
        <BoxContact>
          <ImgShowAll src={Images.showAllContact} alt='Kontakty' />
          <ShowAllContactsTitle>Kontakty</ShowAllContactsTitle>
        </BoxContact>
        <ManageContacts>
          <ManageGroupsTitle>Zarządzaj</ManageGroupsTitle>
        </ManageContacts>
        <BoxContact>
          <ImgTrash src={Images.trash} alt='Kosz' />
          <TrashTitle>Kosz</TrashTitle>
        </BoxContact>
      </BoxManage>

      <ManageGroups>
        <BoxGroupsContactTitle>Grupy</BoxGroupsContactTitle>
        <BoxGroupsContactImg src={Images.plusGroup} alt='Dodaj Grupe' />
      </ManageGroups>
      <BoxGrups>
        <BoxGroupsContactList> {ContactGroups}</BoxGroupsContactList>
      </BoxGrups>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.sideBox.borderColor};
`
const ContactLogo = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  height: 50px;
  width: 100%;
  margin-top: 5px;
`
const ImgLogo = styled.img`
  width: 40px;
`
const ContactTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.title.color};
  font-weight: 400;
  font-size: ${({ theme }) => theme.sideBox.title.fontSize};
  text-align: center;
`
const CreateContact = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  margin: 15px auto;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.4);
  border-radius: 25px;
  width: 80%;
  height: 40px;
  background-color: transparent;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    cursor: pointer;
    box-shadow: none;
  }
`
const CreateContactTile = styled.div`
  color: ${({ theme }) => theme.sideBox.createContact.color};
  font-weight: ${({ theme }) => theme.sideBox.createContact.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.createContact.fontSize};
`

const ImgAdd = styled.img`
  width: 20px;
`
const BoxContact = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  border-radius: 0 25px 25px 0;
  height: 35px;
  margin-top: 10px;
  width: 180px;
  background-color: transparent;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    cursor: pointer;
  }
`
const ImgShowAll = styled.img`
  width: 20px;
`
const ShowAllContactsTitle = styled.div``

const ManageContacts = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0 0 10px;
`
const ManageGroupsTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.groupTitle.color};
  font-weight: ${({ theme }) => theme.sideBox.groupTitle.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.groupTitle.fontSize};
`
const ImgTrash = styled.img`
  width: 20px;
`
const TrashTitle = styled.div``

const ManageGroups = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  align-items: center;
  height: 35px;
`

const BoxManage = styled.div`
  height: 40%;
`
const BoxGroupsContactTitle = styled.div`
  color: ${({ theme }) => theme.sideBox.groupTitle.color};
  font-weight: ${({ theme }) => theme.sideBox.groupTitle.fontWeight};
  font-size: ${({ theme }) => theme.sideBox.groupTitle.fontSize};
`
const BoxGroupsContactImg = styled.img`
  width: 20px;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    border-radius: 50%;
    cursor: pointer;
  }
`

const BoxGrups = styled.div`
  height: 60%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: inherit;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`
const BoxGroupsContactList = styled.ul`
  margin: 0;
  padding: 0;
`
const BoxGroupsContactItem = styled.li`
  display: flex;
  justify-content: center;
  column-gap: 5px;
  align-items: center;
  border-radius: 0 25px 25px 0;
  height: 35px;
  margin-top: 10px;
  width: 180px;
  background-color: transparent;

  :hover {
    background-color: ${({ theme }) => theme.sideBox.group.selectedColorHover};
    cursor: pointer;
  }
`
