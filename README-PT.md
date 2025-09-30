# Deckhub

[Inglês](./README.md)

Este projeto têm como objetivo ser uma ferramenta de baralho genérico, tendo como funcionalidades o embaralhamento de cartas, pesquisa de cartas no baralho, dentre muitas outras usando uma estrutura simples e intuitiva em um arquivo Json.

Esta foi uma idéia que eu tive enquanto desenvolvia um jogo de cartas.

## Estrutura Básica do Baralho

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

- **effects**: Uma coleção de efeitos que a carta possui, eles são aplicados na ordem em que são definidos
    - **search(effect)**: Indica o id da carta sendo procurada
    - **draw(effect)**: Indica o quanto deve ser sacado do baralho
    - **shuffleAfter**: Indica se deve embaralhar depois de aplicar o efeito
    - **shuffleBefore**: Indica se deve embaralhar antes de aplicar o efeito

> Note que "search" e "draw" são nomes de efeitos, então eles não devem estar no mesmo objeto! Exemplo: { "draw": 1, "search": 1, "shuffleBefore": true, "shuffleAfter": true }
