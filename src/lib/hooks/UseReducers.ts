export const useReducers = () => {
  const initialTodos = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]

  const reducer = (state, action) => {
    switch (action.type) {
      case 'COMPLETE':
        return state.map((todo) => {})
      default:
        return state
    }
  }

  return { initialTodos, reducer }
}
