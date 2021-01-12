# 1. About

The code of learning on Udemy course [Master Full-stack Web Development](https://www.udemy.com/course/full-stack/).

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
