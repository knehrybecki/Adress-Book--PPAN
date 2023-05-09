import { HomeHeader, HomeSide, SideComponent } from 'lib/components'
import { Outlet } from 'react-router'

export const LayoutHome = () => {
  return (
    <>
      <HomeHeader />
      <HomeSide>
        <SideComponent />
        <Outlet />
      </HomeSide>
    </>
  )
}
