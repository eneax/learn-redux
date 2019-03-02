# Redux

Before diving into Redux, it's important to understand some fundamental concepts of programming.


## What's an app

An App is made of two fundamental components: UI and State.
If you think of some bugs that you have experienced lately in your code, chances are that the main reason for the bug to occur was '*state mismanagement*'.
The app was expecting one state, but it got something else.

And what we normally do when some problem occurs with an app? Restart the app.
Restarting an app means that we restart the 'State' in that app.

By increasing the *predictability* of your state, you decrease the amount of bugs in your application.
Our goal is to make the state more predictable. It will, of course, to less bugs and a better overall experience using the app.

When we build an app, what happens is that typically, the state spread through the entire application.
If you are dealing with React, the state is spread through several components.

If we want to increasing predictability, then it's better to keep all the state in one place, which will be called '**State Tree**'.


## State Tree

Benefits of State Tree:
- *Shared Cache*: tells each component to grab the state from the State Tree, without having to pass the props between parents and children;
- *Predictable State Changes*: we setup strict rules for how and when you can change the state;
- *Improved developer tooling*: easier to debug your app;
- *Pure Functions*: receive state and display some UI based on that state;
- *Server Rendering*: when a request is made to the server, you return both the State and the UI. Thanks to the State Tree, it's easier to get the data in the first place.


# Characteristics of a Pure Functions
- They always return the same result if the same arguments are passed in.
- They depend only on the arguments passed into them.
- Never produce any side effects.


## The Store

Once we put all the State in one place, we need three more things:
* First, we need to **GET** the *State* from the State Tree
* We need to **Listen** for changes in the State Tree, so that we can update the UI, when the *State* changes
* Finally, we need to **Update** the State Tree


## Main Concepts

* An action is an object which describes what sort of transformation you want to make to your state.

* Action Creators: 
  - they return different actions, and actions are object representations of different events that can occur in your application
  - they can change the State of the Redux Store
  - they must have a type property

* Reducers: 
  - they take the current state of that specific section of our store plus the specific action which was dispatched
  - depending on the action, return a brand new state based on that action
  - they need to be pure functions. It means that they cannot modify the state directly. That's why they return a brand new copy of the state

* Create a store:
  - since we have two reducers, we use Redux.combineReducers(), which returns us one single reducer that we pass to Redux.createStore()
  - once the store is created, it contains the entire State of the app in addition to three properties on it:
    - getState: get the State from inside the Store,
    - subscribe: notifies us when the state changes,
    - dispatch: updates the state. We pass it an action creator which returns the actual action object.

* Redux goes through all the reducers in order to identify the case related to that specific action and when it finds it, it returns a brand new state. When Redux is done with one reducer, it moves to the next and if it doesn't respond to the specific event that occurred, it return what was the previous state.



<!-- 
Object.assign({}, todo, { complete: !todo.complete }))
* creates brand new object
* merge all the properties of todo into that new object
* instead of using the default complete, change it to its opposite 
-->