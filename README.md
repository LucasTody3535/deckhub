# Deckhub

[Portuguese](./README-PT.md)

This project aims to be a generic deck tool, allowing functionalites
like deck shuffle, deck search and more by using a simple and intuitive
structure in a json file.

This was an idea I had while developing a card game.

## Basic Deck Structure

``` json
{
    "name": "Deck 1",
    "initialDrawAfterFirstShuffle": 3,
    "drawQuantityInEachTurn": 1,
    "cards": [
        {
            "name": "Card 1",
            "description": "Description 1",
            "quantity": 2,
            "id": 1
        },
        {
            "name": "Card 2",
            "description": "Description 1",
            "quantity": 3,
            "id": 2,
            "effects": [
                { "draw": 1, "shuffleBefore": true },
                { "search": 1, "shuffleAfter": true },
                { "search": 2, "shuffleBefore": true, "shuffleAfter": true }
            ]
        },
    ]
}
```

## Explanation of Optional Attributes

- **effects**: A collection of effects a card has. They are applied in the order they are defined
    - **search(effect)**: Indicates the id of the card being searched
    - **draw(effect)**: Indicates how much to draw from deck
    - **shuffleAfter**: Indicates if the deck should be shuffled after the effect has been applied
    - **shuffleBefore**: Indicates if the deck should be shuffled before applying the effect

> Note that "search" and "draw" are effect names, so they cannot be in the same object! Example: { "draw": 1, "search": 1, "shuffleBefore": true, "shuffleAfter": true }