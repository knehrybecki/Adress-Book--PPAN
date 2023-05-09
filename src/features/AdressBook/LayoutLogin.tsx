import { Outlet } from 'react-router'
import { LoginFooter, LoginHeader } from 'lib/components'
import { Dictionary } from 'lib/types'

export type LayoutLoginProps = {
  T: Dictionary
}
export const LayoutLogin: React.FunctionComponent<LayoutLoginProps> = ({
  T,
}) => {
  return (
    <>
      <LoginHeader T={T} />
      <Outlet />
      <LoginFooter />
    </>
  )
}
