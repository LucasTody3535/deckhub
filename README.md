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

### Running the Project

> This guide will assume you have a basic understanding of the CLI and how to use tools in it, like Git and NPM.

#### Downloading the Project

First, you will need to download a copy of this project, you can do that with the following command:

``` bash
git clone https://github.com/LucasTody3535/deckhub.git
```

This will download the project's code under the **deckhub** folder, located inside the folder where you executed the command.

Now that we have the project, run the following to enter inside the folder:

```bash
cd deckhub
```

Now you need to install the project's dependencies, this can be done in two ways:

```bash
npm install # Common way, install and modifies both package.json & package-lock.json files tough
npm ci # Install the dependencies, but without updating the aforementioned files
```

After downloading the project's dependencies, you can execute it by running ```npm run dev```, this command will let you to access the application in the  **http://localhost:5173/deckhub** address, that you can access in your preferred browser.

> You can use the json files inside the **sample** folder to use the application without needing to actually create an elaborated deck structure beforehand.
