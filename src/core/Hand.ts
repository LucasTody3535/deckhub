import type { Card } from "./Card";

export class Hand {
  private cards!: Array<Card>;

  constructor() {
    this.cards = [];
  }

  public addOneCard(card: Card) {
    this.cards.push(card);
  }

  public removeCard(index: number) {
    let cardRemoved = this.cards[index];
    this.cards = this.cards.filter((_, cardIndex) => index != cardIndex);
    return cardRemoved;
  }

  public getCards() {
    return this.cards;
  }

  public setInitialHand(cards: Array<Card>) {
    this.cards = cards;
  }
}
