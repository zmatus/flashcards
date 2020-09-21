# Jekyll Flashcards

Converts terms written in markdown to flashcards using Jekyll and Github Pages.

Demo: [Example Deck](https://raisingexceptions.com/jekyll-flashcards/)

## Contents
- [About](#about)
- [Project URL](#project-url)
- [Quickstart](#quick-start)
- [Run Locally](#run-locally)

## About

This project makes use of Github Pages to automatically generate flashcards from markdown files. The files are hosted for free on Github and changes made to the project will be updated by Github automatically.

## Project URL

To change the URL of the project, go to `_config.yml` and change `baseurl` to your project name:

```
baseurl: /project-name
```

## Quickstart

To create a new deck, create a new markdown file in the `_decks` directory. For example, `new-deck.md`.

At the top of each markdown file, always include the title of your deck:

```
---
title: New Deck
---
```

For each flashcard, follow this format:

```
1a. Front term
1b. Back explanation.

2a. Term
2b. Longer explanation. With additional details.
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

## Run Locally

To run the project locally, follow the instructions on [Jekyll Quickstart](https://jekyllrb.com/docs/).