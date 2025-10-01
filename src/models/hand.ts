import type { Card } from "./card";

export class Hand {
  private cards!: Array<Card>;

  constructor(cards: Array<Card>) {
    this.cards = cards;
  }

  public addOneCard(card: Card) {
    this.cards.push(card);
  }

  public removeCard(index: number) {
    this.cards = this.cards.filter((_, cardIndex) => index != cardIndex);
  }
}
