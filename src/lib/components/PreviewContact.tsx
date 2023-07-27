import { Images } from 'assets'
import { HamburgerMenu } from 'lib/components/HamburgerMenu'
import { useFetch } from 'lib/hooks'
import { RootState } from 'lib/reducers'
import { HomeReducerTypes } from 'lib/types'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

export const PreviewContact = () => {
  const { PREVIEW_CONTACT, SHOW_HEADER } = HomeReducerTypes

  const { previewContact } = useSelector((state: RootState) => state.home)
  const { getPreviewContact } = useFetch()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const wasCalled = useRef<boolean>(false)
  if (previewContact.id) {
    sessionStorage.setItem('previewID', previewContact.id)
  }
  useEffect(() => {
    dispatch({ type: SHOW_HEADER, payload: false })
    const lastPreview = sessionStorage.getItem('previewID')
    if (!lastPreview) return
    if (wasCalled.current) return
    wasCalled.current = true

    getPreviewContact(lastPreview).then((data) => {
      if (!data) return
      dispatch({
        type: PREVIEW_CONTACT,
        payload: data,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    firstName,
    lastName,
    companyName,
    positionInCompany,
    email,
    phoneMobile,
    phoneHome,
    groupName,
  } = previewContact

  return (
    <Container>
      <TopInformation>
        <HamburgerMenu />
        <DataContact>
          <Name>
            {firstName} {lastName}
          </Name>
          <Company>
            {positionInCompany
              ? `${positionInCompany}, ${companyName}`
              : companyName}
          </Company>
          <Group>{groupName}</Group>
        </DataContact>
        <EditInformation
          onClick={() => {
            navigate('edit')
          }}
        >
          <ButtonEdit>Edytuj</ButtonEdit>
        </EditInformation>
      </TopInformation>
      <BottomBoxInformation>
        <Box>
          <Title>Dane Kontaktowe</Title>
          <OtherInformation>
            <Email>
              {' '}
              {email && (
                <>
                  <ImgName src={Images.emailIcon} />
                  {email}
                </>
              )}
            </Email>
            <PhoneMobile>
              {' '}
              <ImgName src={Images.callIcon} />
              {phoneMobile}
            </PhoneMobile>
            <PhoneHome>
              {phoneHome && (
                <>
                  <ImgName src={Images.oldCallIcon} />
                  {phoneHome}
                </>
              )}
            </PhoneHome>
          </OtherInformation>
        </Box>
      </BottomBoxInformation>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TopInformation = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid #8888;
  align-items: center;
  padding-bottom: 20px;
`

const DataContact = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Company = styled.div`
  font-size: 15px;
`

const Group = styled.div`
  font-size: 15px;
`

const EditInformation = styled.div``

const ButtonEdit = styled.button`
  background-color: #ff4444;
  color: #fff;
  border-radius: 6px;
  width: 100px;
  height: 30px;

  :hover {
    background-color: #fc2c2c;
  }
`

const BottomBoxInformation = styled.div`
  margin-top: 50px;
  margin-left: 50px;
  border: 1px solid #adadad;
  border-radius: 5px;
  max-width: 450px;
  height: 100%;
`

const Box = styled.div`
  padding: 10px;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const OtherInformation = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin: 20px;
`

const Email = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`

const PhoneMobile = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`

const PhoneHome = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`
const ImgName = styled.img`
  width: 20px;
`
