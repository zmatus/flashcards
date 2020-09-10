---
layout: deck
title: JavaScript Fundamentals
---

1a.
```js
let result;

if (a > 0) {
  result = 'positive';
} else {
  result = 'NOT positive';
}
```
1b. The `if statement` executes if a specified condition is truthy. If condition is falsy, another statement is executed.

2a. The `while statement` creates a loop that executes a specified statement as long as the condition evaluates to true.
2b.
```js
let n = 0;

while (n < 3) {
  n++;
}
```

3a.
```js
let str = '';

for (let i = 0; i < 9; i++) {
  str = str + i;
}
```
3b. The `for statement` creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement to be executed in the loop.