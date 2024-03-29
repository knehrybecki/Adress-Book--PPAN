import {
  HomeContacts,
  HomeHeader,
  HomeSide,
  Popper,
  SideComponent,
} from 'lib/components'

import { Outlet } from 'react-router'

export const LayoutHome = () => {
  return (
    <>
      <HomeHeader />
      <HomeSide>
        <SideComponent />
        <HomeContacts>
          <Outlet />
        </HomeContacts>
      </HomeSide>
      <Popper />
    </>
  )
}
