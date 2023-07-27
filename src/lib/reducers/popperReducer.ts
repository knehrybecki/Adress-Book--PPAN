import { createAction, createReducer } from '@reduxjs/toolkit'
type positionPopperProps = {
  top: number
  left: number
}
export const INITIAL_STATE_POPPER = {
  positionPopper: {
    top: 0,
    left: 0,
  },
  textPopper: '',
  tooglePopper: false,
}

const positionPopper = createAction<positionPopperProps>('POSITION_POPPER')
const textPopper = createAction<string>('TEXT_POPPER')
const tooglePopper = createAction<boolean>('SHOW_POPPER')
export const PopperReducer = createReducer(INITIAL_STATE_POPPER, (builder) => {
  builder.addCase(positionPopper, (state, action) => {
    state.positionPopper = {
      top: action.payload.top,
      left: action.payload.left,
    }
  })
  builder.addCase(textPopper, (state, action) => {
    state.textPopper = action.payload
  })
  builder.addCase(tooglePopper, (state, action) => {
    state.tooglePopper = action.payload
  })
})
