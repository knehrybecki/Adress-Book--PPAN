import { useDispatch } from 'react-redux'

export const usePopper = () => {
  const dispatch = useDispatch()

  const handleMouseEntryPopper = (
    e:
      | React.MouseEvent<HTMLElement, MouseEvent> &
          React.MouseEvent<SVGSVGElement, MouseEvent> &
          React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const rect = e.target.getBoundingClientRect()

    const pos = rect.left - 30

    dispatch({
      type: 'TEXT_POPPER',
      payload: e.currentTarget.getAttribute('aria-label'),
    })

    dispatch({
      type: 'POSITION_POPPER',
      payload: {
        top: rect.top,
        left: pos,
      },
    })
    dispatch({
      type: 'SHOW_POPPER',
      payload: true,
    })
  }

  const handleMouseLeavePopper = () => {
    dispatch({
      type: 'SHOW_POPPER',
      payload: false,
    })
  }

  return { handleMouseEntryPopper, handleMouseLeavePopper }
}
