import type { IEffect } from "../interfaces/IEffect";
import type { Deck } from "../core/Deck";
import type { Hand } from "../core/Hand";

export class SearchEffect implements IEffect {
  private deck: Deck;
  private hand: Hand;
  private cardId: number;

  constructor(deck: Deck, hand: Hand, cardId: number) {
    this.deck = deck;
    this.hand = hand;
    this.cardId = cardId;
  }

  apply(): void {
    const cardDrawed = this.deck!.getCardById(this.cardId);
    this.deck!.shuffle();
    if (cardDrawed) this.hand!.addOneCard(cardDrawed);
  }
}
