import type { Deck } from "../models/deck";
import type { Hand } from "../models/hand";
import { CardUI } from "./card_ui";

export class HandUI {
  private root: HTMLElement;
  private hand: Hand;
  private deck: Deck;

  constructor(hand: Hand, deck: Deck, parent?: HTMLElement) {
    this.hand = hand;
    this.deck = deck;
    this.root = document.createElement("div");
    this.root.classList.add("hand-ui");
    this.updateUI();
    parent?.appendChild(this.root);
  }

  public updateUI() {
    let cardUI: CardUI;
    let cards = this.hand.getCards();
    let cardClickListener: () => void;
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    cards.forEach((card, index) => {
      cardUI = new CardUI(this.root, card.getName());
      cardClickListener = () => {
        const cardRemoved = this.hand.removeCard(index);
        cardRemoved.getEffects()?.forEach((effect) => {
          if (effect.draw) {
            if (effect.shuffleBefore) this.deck.shuffle();
            const cardDrawed = this.deck!.drawCard();
            if (effect.shuffleAfter) this.deck!.shuffle();
            if (cardDrawed) this.hand!.addOneCard(cardDrawed);
          }
        });
        this.root.childNodes.forEach((node) => {
          node.removeEventListener("click", cardClickListener);
        });
        this.updateUI();
      };
      cardUI.onClick(cardClickListener);
    });
  }
}
