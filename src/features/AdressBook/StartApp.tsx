import { Dictionary, welcomeType } from '../../lib/types'
import { Outlet } from 'react-router'

export type StartAppProps = {
  T: Dictionary
}

export const StartApp: React.FunctionComponent<StartAppProps> = ({ T }) => {
  return <Outlet />
}
