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

4a. Statements
4b. Syntax constructs and commands that perform actions.

5a. The `do...while statement` creates a loop that executes a specified statement until the test condition evaluates to false. The condition is evaluated after executing the statement, resulting in the specified statement executing at least once.
5b.
```js
let result = '';
let i = 0;

do {
  i = i + 1;
  result = result + i;
} while (i < 5);
```

6a. Mergesort algorithm
6b.
```js
function mergeSort(left, right) {
  let i = 0;
  let j = 0;
  let results = [];

  while (i < left.length || j < right.length) {
    if (i === left.length) {
      results.push(right[j]);
      j++;
    }
    else if (j === rght.length || left[i] <= right[i]) {
      results.push(left[i]);
      i++;
    } else {
      results.push(right[j]);
      j++;
    }
  }
  return results;
}
```