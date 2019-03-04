// Logger: logs the specific action that is dispatched and the new state based on that dispatched action
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The action: ', action);
  // if next is the last middleware, it will be a dispatch
  const result = next(action);
  console.log('The new State: ', store.getState());
  console.groupEnd();
  return result;
}

export default logger;
