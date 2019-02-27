// List of Actions
// An action is an object which describes what sort of transformation you want to make to your state.
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon'
  }
}

{
  type: 'REMOVE_GOAL',
  id: 0
}

/*
Characteristics of a Pure Function
1) They always return the same result if the same arguments are passed in.
2) They depend only on the arguments passed into them.
3) Never produce any side effects.
*/


function todos (state = [], action) {     // if state is undefined, set it to empty array
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}


// 'createStore()' is function we'll invoke to create a new store
function createStore() {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  // method on store to invoke to get the internal state
  const getState = () => state
  
  // 'subscribe' is a method for listening to changes on the state
  const subscribe = (listener) => {
    listeners.push(listener)

    // '.subscribe()' returns a function to unsubscribe --> it removes the listener from the listeners array
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return {
    getState,
    subscribe,
  }
}
