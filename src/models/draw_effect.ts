import type { IEffect } from "../interfaces/IEffect";
import type { Deck } from "../core/Deck";
import type { Hand } from "./hand";

export class DrawEffect implements IEffect {
  private deck: Deck;
  private hand: Hand;

  constructor(deck: Deck, hand: Hand) {
    this.deck = deck;
    this.hand = hand;
  }

  apply(): void {
    const cardDrawed = this.deck!.drawCard();
    this.deck!.shuffle();
    if (cardDrawed) this.hand!.addOneCard(cardDrawed);
  }
}
