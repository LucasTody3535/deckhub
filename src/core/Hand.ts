import type { Card } from "./Card";

type OnCardRemovedListener = (card: Card) => void;

export class Hand {
  private cards!: Array<Card>;
  private onCardRemovedListeners: Array<OnCardRemovedListener>;

  constructor() {
    this.cards = [];
    this.onCardRemovedListeners = [];
  }

  public addOneCard(card: Card) {
    this.cards.push(card);
  }

  public removeCard(index: number) {
    let cardRemoved = this.cards[index];
    this.onCardRemovedListeners?.forEach((listener) => listener(cardRemoved));
    this.cards = this.cards.filter((_, cardIndex) => index != cardIndex);
    return cardRemoved;
  }

  public getCards() {
    return this.cards;
  }

  public setInitialHand(cards: Array<Card>) {
    this.cards = cards;
  }

  public onCardRemoved(listener: OnCardRemovedListener) {
    this.onCardRemovedListeners.push(listener);
  }

  public removeListeners() {
    this.onCardRemovedListeners.length = 0;
  }
}
