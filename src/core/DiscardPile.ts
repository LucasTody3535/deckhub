import type { Card } from "./Card";

type OnCardAddedListeners = (quantity: number) => void;

export class DiscardPile {
  private cards!: Array<Card>;
  private onCardAddedListeners: Array<OnCardAddedListeners>;

  constructor() {
    this.cards = [];
    this.onCardAddedListeners = [];
  }

  public addCard(card: Card) {
    this.cards.push(card);
    this.onCardAddedListeners.forEach((listener) =>
      listener(this.cards.length),
    );
  }

  public getCards() {
    return this.cards;
  }

  public onCardAdded(listener: OnCardAddedListeners) {
    this.onCardAddedListeners.push(listener);
  }

  public removeListeners() {
    this.onCardAddedListeners.length = 0;
  }
}
