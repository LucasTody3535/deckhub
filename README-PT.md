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

## Explicação de Atributos Opcionais

- **effect**: Um objeto com uma propriedade principal chamada type, usada para identificar o efeito que será aplicado.

### Lista de Efeitos

- **1**: Saque uma carta do baralha e então o embaralhe. Este objeto contém apenas a propriedade type..
- **2**: Retorna a primeira carta do baralho com o id especificado e então o embaralhe. O objeto precisa conter tanto a propriedade type quanto a propriedade target, sendo esta, contendo o id da carta que se deseja selecionar. 
