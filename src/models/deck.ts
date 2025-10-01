import type { IDeckStructure } from "../interfaces/IDeckStructure";
import { Card } from "./card";

export class Deck {
  private name: string;
  private initialDrawAfterFirstShuffle: number;
  private drawQuantityInEachTurn: number;
  private cards: Array<Card>;

  constructor(data: IDeckStructure) {
    this.name = data.name;
    this.initialDrawAfterFirstShuffle = data.initialDrawAfterFirstShuffle;
    this.drawQuantityInEachTurn = data.drawQuantityInEachTurn;
    this.cards = [];
    data.cards.forEach((card) => {
      for (let i = 0; i < card.quantity; i++) {
        this.cards.push(new Card(card));
      }
    });
  }

  public getName() {
    return this.name;
  }

  public getInitialDraw() {
    return this.initialDrawAfterFirstShuffle;
  }

  public getDrawInEachTurn() {
    return this.drawQuantityInEachTurn;
  }

  public getCards() {
    return this.cards;
  }
}
