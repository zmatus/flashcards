# Jekyll Flashcards

Converts terms written in markdown to flashcards using Jekyll and Github Pages.

## About

This project makes use of Github Pages to automatically generate flashcards from markdown files. The files are hosted for free on Github and changes made to the project will be updated by Github automatically.

## Quick Start

To create a new deck, create a new markdown file in the `_decks` directory. For example, `new-deck.md`.

At the top of each markdown file, always include this:

```
---
layout: deck
title: New Deck
---
```

This makes sure that the text inside the file will be used to create flashcards. For each term, use this format:

```
1a. Term
1b. Explanation.

2a. Term
2b. Longer explation. With additional details.
```

To add code to a card, add triple backticks before the code block:

````
3a. JavaScript while loop
3b.
```
let n = 0;

while (n < 3) {
  console.log(n);
  n++;
}
```
````