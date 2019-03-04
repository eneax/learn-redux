import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';


function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

export function handleAddTodo(name, cb) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodoAction(todo));
        cb();
      })
      .catch(() => alert('An error occurred. Try again.'));
  }
}

// it works because we created a thunk middleware
export function handleDeleteTodo(todo) {
  return (dispatch) => {
    // instantly remove item from Store locally
    dispatch(removeTodoAction(todo.id));

    // then make request to delete also from the database
    return API.deleteTodo(todo.id)
      .catch(() => {
        // if there is an error, add item back to UI
        dispatch(addTodoAction(todo));
        alert('An error occurred. Try again.');
      })
  }
}

export function handleToggleTodo(id) {
  return (dispatch) => {
    dispatch(toggleTodoAction(id))

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodoAction(id));
        alert('An error occurred. Try again.');
      })
  }
}
