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
            "description": "Description 2",
            "quantity": 3,
            "id": 2,
            "effect": {
                "type": 1
            }
        },
        {
            "name": "Card 3",
            "description": "Description 3",
            "quantity": 3,
            "id": 3,
            "effect": {
                "type": 2,
                "target": 1
            }
        }
    ]
}
```

## Explanation of Optional Attributes

- **effect**: An object with a main property named type, which identifies the effect which will be applied.

### List of Current Effects

- **1**: Draw a card from deck then shuffles it. This object is composed of only the type property.
- **2**: Returns the first card from the deck with given id then shuffles deck. This object is composed of both type and target properties, with target being the card id that should be affected.