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

### Executando o Projeto

> Este guia assume the você possui um conhecimento básico sobre o CLI e como usar ferramentas nele, como o Git e o NPM.

#### Baixando o Projeto

Primeiro, você precisa baixar uma cópia deste projeto, você pode fazer com o seguinte comando:

``` bash
git clone https://github.com/LucasTody3535/deckhub.git
```

Esse comando irá baixar o código sob o diretório **deckhub**, localizado dentro da pasta onde você executou o comando anterior.

Agora que você baixou o projeto, execute o seguinte código para entrar na pasta do projeto:

```bash
cd deckhub
```

Agora precisamos instalar as dependências do projeto, podendo ser feito de suas maneiras:

```bash
npm install # Maneira comum, porém, modifica os arquivos package.json & package-lock.json
npm ci # Instala as dependências, mas sem modificar os arquivos mencionados
```

Após fazer o download das dependências, você pode executa-lo com o comando ```npm run dev```, este comando permitirá você acessar a aplicação no endereço **http://localhost:5173/deckhub**, que você pode acessar no seu browser preferido.

> Você pode usar os arquivos dentro da pasta **sample** evitando a necessidade de criar um arquivo do zero com a estrutura necessária para execução correta da aplicação.
