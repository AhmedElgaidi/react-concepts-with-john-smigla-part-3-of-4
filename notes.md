# React hooks:
- Anything starts with useSomething is a react hook, so what is a hook? They are just a functions given by react that makes the development alot easier.

# Why using useState is nessary as our applications get bigger and more complicated?
Note: when we don't use useState hook and try to deal with some varibles, their values would be changed only in the app not in the UI (user interface), i mean there wouldn't be any kind of rerendering for the component in the virtual dom. So, the idea of manging states come from here to change the value of a variable in both places (code, UI).

In order to use state, we need to import useState module from react

# Some react hooks rules:
- start with use word.
- The first character must be upperCase.
- must be in the component/ function body.
- cann't call conditionally. (look at useEffect, it's obivous there) you can't put useSomething() as a condition in if statment, solution? use if statemnt inside it.


# useEffect hook:
- It allows you to do the side effect (any work outside component, could be changing document title, signing user up, fetching data, setting an event listener, etc...) not some tasks in the component itself.
1) By default, it runs after every time.
2) clean up function.
3) second parameter.

# Remember: useState forces the rerender, and useEffect works by default on every rerender, so they work together in complex tasks.


# conditional rendering:
this means we can display different componetn content based on some conditions look at [8]


# useRef() hook
- Preserves value. (just like useState)
- Doesn't trigger rerender.
- Target DOM nodes/elements (most used cases for useRef)

# useReducer() hook
- It's role arise especially in the complex app (add more structure to our states).
- It's same as redux in functionality. Once we learn it, then it would be super easy to learn redux.

# prop drilling
- It's when you want to pass some props from the main components down to other tree components.

# useContext
- It's bettter in complex prop drilling.

# custom hooks:
- we use it when we want to reuse a functionality (component)
- custom hook name, needs to start with 'use' part

# prop types:
- it allows us to validate our props that we ar passing to a component

# React routers:
- 