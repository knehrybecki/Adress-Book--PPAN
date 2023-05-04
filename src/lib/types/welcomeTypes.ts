export enum StatusServer {
  SET_STATUS_SERVER = 'SET_STATUS_SERVER',
  SERVER_OK = 'SERVER_OK',
  SERVER_ERROR = 'SERVER_ERROR',
  SERVER_RECONNECT = 'SERVER_RECONNECT',
}

export type welcomeType = {
  statusServer: string
  statusDB: string
  colorloading: string
  isError: boolean
  codeError: string
}
export enum StatusCheck {
  Bad = 'Bad',
  Good = 'Good',
  NotConnectedDB = 'Błąd połączenia z Bazą Danych',
  statusDBTS = 'statusDB',
  statusServerTS = 'statusServer',
  errMessageTS = 'errMessage',
}
