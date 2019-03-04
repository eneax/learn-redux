// Check if someone add something containing the word 'bitcoin'
const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().indexOf('bitcoin') !== -1
  ) {
    return alert("Nope. That's a bad idea.")
  }

  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf('bitcoin') !== -1
  ) {
    return alert("Nope. That's a bad idea.")
  }

  // next is either the next middleware in the middleware-chain or the final dispatch
  return next(action)
}

export default checker;