import type { Deck } from "../models/deck";
import type { Hand } from "../models/hand";
import { CardUI } from "./card_ui";

export class HandUI {
  private root: HTMLElement;
  private hand: Hand;
  private deck: Deck;
  private cards!: Array<CardUI>;

  constructor(hand: Hand, deck: Deck, parent?: HTMLElement) {
    this.hand = hand;
    this.deck = deck;
    this.root = document.createElement("div");
    this.root.classList.add("hand-ui");
    this.updateUI();
    parent?.appendChild(this.root);
  }

  private addEventHandler(card: CardUI, index: number) {
    card.onClick(() => {
      const cardRemoved = this.hand.removeCard(index);
      cardRemoved.getEffects()?.forEach((effect) => {
        if (effect.draw) {
          if (effect.shuffleBefore) this.deck.shuffle();
          const cardDrawed = this.deck!.drawCard();
          if (effect.shuffleAfter) this.deck!.shuffle();
          if (cardDrawed) this.hand!.addOneCard(cardDrawed);
        }
      });
      this.cards.forEach((card) => card.removeOnClickHandler());
      this.updateUI();
    });
  }

  public updateUI() {
    let handCards = this.hand.getCards();
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    this.cards = [];
    handCards.forEach((card, index) => {
      this.cards.push(new CardUI(this.root, card.getName()));
      this.addEventHandler(this.cards[index], index);
    });
  }
}
