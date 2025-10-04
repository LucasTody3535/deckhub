import type { Hand } from "../core/Hand";
import { CardUI } from "./CardUI";

export class HandUI {
  private root: HTMLElement;
  private hand: Hand;
  private cards!: Array<CardUI>;

  constructor(hand: Hand, parent?: HTMLElement) {
    this.hand = hand;
    this.root = document.createElement("div");
    this.root.classList.add("hand-ui");
    this.updateUI();
    parent?.appendChild(this.root);
  }

  private addEventHandler(card: CardUI, index: number) {
    card.onClick(() => {
      const cardRemoved = this.hand.removeCard(index);
      cardRemoved.getEffect()?.apply();
      this.cards.forEach((card) => card.removeOnClickHandler());
      this.updateUI();
    });
  }

  public updateUI() {
    let handCards = this.hand.getCards();
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    this.cards = [];
    handCards.forEach((card, index) => {
      this.cards.push(new CardUI(this.root, card));
      this.addEventHandler(this.cards[index], index);
    });
  }

  public setHand(hand: Hand) {
    this.hand = hand;
  }
}
