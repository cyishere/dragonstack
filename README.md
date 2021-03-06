# 1. About

The code & notes of learning on Udemy course [Master Full-stack Web Development](https://www.udemy.com/course/full-stack/).

# 2. JavaScript Promises

## (1) What are JavaScript Promises?

- The guaranteed future of an eventual value: can't be broken until resolved or rejected
- The completion or failure of an **asynchronous** operation
- Enfore **order** and coordinate asynchronous behavior

## (2) How do they work?

- Functions that accept a callback: only accepts one parameter which is the callback, the callback accepts two parameters which are `resolve` and `reject`
- Wraps around **resolve** and **reject** functions

### i. Resolve

Asynchronous functionality has succeeded. Return a value.

### ii. Reject

The promise returns an error.

**To handle these resolved values or rejected errors, we use **handlers**.**

## (3) Handlers

- `.then` handler, with a callback which present the resolved values: `.then` only takes one argument which is a callback function, and the parameter to this callback function is gonna **match one to one** the resolve value from the function.
  - We could pass any structure syntax into the `resolve` callback;
- `.catch` handler, with a callback to handle error values

```js
const examplePromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve({ message: "Woohoo!" });
  } else {
    reject({ message: "Oh, no..." });
  }
});

examplePromise
  .then(({ message }) => console.log("message", message))
  .catch((error) => console.error("error", error));
```

## (4) Chaining

- Return promises as the result of promises
- Chain multiple promises to **enfore order over asynchronous tasks**

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("Hello"));
})
  .then((message) => {
    console.log(message); // Hello

    return new Promise((resolve, reject) =>
      setTimeout(resolve(message + " World"))
    );
  })
  .then((message) => {
    console.log(message); // Hello World

    return new Promise((resolve, reject) =>
      setTimeout(resolve(message + "!!!"))
    );
  })
  .then((message) => {
    console.log(message); // Hello World!!!
  });
```

## 3. Other Notes

A recursive function means one that calls itself.

`componentWillUnmount()`

This is because it's best to place data in the state when we expect that data to be reflected and rendered in the actual React component. The reference to the timer is fine to attach the component itself since its eventual effect is a call a function that updates the state. It's not dependent or rather it shouldn't exist within the state itself.

In other words the reference itself is not something that will directly affect the appearance of the application.

🔥 **About how to use `setTimeout()` & `clearTimeout()`:**

- [React hooks - right way to clear timeouts and intervals](https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals)
- [setTimeout in React Components Using Hooks](https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks)
- [Using refs to check if a component is still mounted](https://dev.to/tusharkashyap63/use-refs-to-check-if-a-component-is-still-mounted-2gk7)

🔥 **Parcel Error**:

When I add async to the app, it occurred this error:

![parcel error](./parcel_error.png)

The solution is add code below to `package.json`. For more information click [here](https://flaviocopes.com/parcel-regeneratorruntime-not-defined/).

```json
"browserslist": [
  "last 3 and_chr versions",
  "last 3 chrome versions",
  "last 3 opera versions",
  "last 3 ios_saf versions",
  "last 3 safari versions"
]
```
