export type FetchLogin = {
  data: {
    token: string
    error: string
  }
}

export enum LoginTypes {
  LOGGED = 'SET_LOGGED',
  Unauthorized = 'Unauthorized',
}
