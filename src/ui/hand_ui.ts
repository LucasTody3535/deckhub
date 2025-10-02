import type { Deck } from "../models/deck";
import type { Hand } from "../models/hand";

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
    let cardTitle: HTMLElement;
    let cardContainer: HTMLElement;
    let cards = this.hand.getCards();
    let cardClickListener: () => void;
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    cards.forEach((card, index) => {
      cardContainer = document.createElement("div");
      cardTitle = document.createElement("p");
      cardContainer.classList.add("hand-ui-card");
      cardTitle.innerText = card.getName();
      cardContainer.append(cardTitle);
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
      cardContainer.addEventListener("click", cardClickListener);
      this.root.appendChild(cardContainer);
    });
  }
}
