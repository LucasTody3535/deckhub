import type { Hand } from "../core/Hand";
import type { CardDescriptionUI } from "./CardDescriptionUI";
import { CardUI } from "./CardUI";

export class HandUI {
  private root: HTMLElement;
  private cards!: Array<CardUI>;
  private cardDescUI: CardDescriptionUI;

  constructor(cardDescUI: CardDescriptionUI, parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.cardDescUI = cardDescUI;
    this.root.classList.add("hand-ui");
    parent?.appendChild(this.root);
  }

  private addEventHandler(card: CardUI, index: number, hand: Hand) {
    let cardDescUI = this.cardDescUI;
    card.onClick(() => {
      const cardRemoved = hand.removeCard(index);
      cardRemoved.getEffect()?.apply();
      this.cards.forEach((card) => card.removeClickEvents());
      this.updateUI(hand);
    });
    card.onRightClick((card) => {
      if (cardDescUI.isVisible()) {
        cardDescUI.hide();
        return;
      }
      if (card.getDescription().replaceAll(" ", "") != "") {
        cardDescUI.updateData(card.getName(), card.getDescription());
        cardDescUI.display();
      }
    });
  }

  public updateUI(hand: Hand) {
    let handCards = hand.getCards();
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    this.cards = [];
    handCards.forEach((card, index) => {
      this.cards.push(new CardUI(this.root, card));
      this.addEventHandler(this.cards[index], index, hand);
    });
  }
}
