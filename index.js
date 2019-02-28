// Library Code (something that you usually download from npm)
// 'createStore()' is function we'll invoke to create a new store
function createStore(reducer) {
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

  // the purpose of dispatch is to update the state (in the most predictable way)
  const dispatch = (action) => {
    // call todos (which will give us a new state)
    state = reducer(state, action)
    // loop over listeners and invoke them (so they know the state is updated)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}


// APP Code (code that you write)
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'


// Reducer function (takes state and action and reduces them to new state)
// if state is undefined, set it to empty array
function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default:
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id)
    default:
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}


/*
Internally, "createStore" gets the new state of the store by invoking "reducer", 
passing it the current state and the action which was dispatched.
*/
const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})


// List of dispatches containing 'actions'
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})


/* 
Object.assign({}, todo, { complete: !todo.complete }))

* create brand new object
* merge all the properties of todo into that new object
* instead of using the default complete, change it to its opposite
*/


/*

function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  } else if (action.type === 'REMOVE_TODO') {
    return state.filter((todo) => todo.id !== action.id)
  } else if (action.type === 'TOGGLE_TODO') {
    return state.map((todo) => todo.id !== action.id ? todo : 
      Object.assign({}, todo, { complete: !todo.complete }))
  } else {
    return state
  }
}

*/


// An action is an object which describes what sort of transformation you want to make to your state.

/*
  Characteristics of a Pure Function
  1) They always return the same result if the same arguments are passed in.
  2) They depend only on the arguments passed into them.
  3) Never produce any side effects.
*/
