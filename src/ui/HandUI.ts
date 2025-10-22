import type { Hand } from "../core/Hand";
import { CardUI } from "./CardUI";

export class HandUI {
  private root: HTMLElement;
  private cardDescription: HTMLElement;
  private cards!: Array<CardUI>;

  constructor(parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.cardDescription = document.createElement("div");
    this.root.classList.add("hand-ui");
    this.cardDescription.id = "hand-ui-card-description";
    parent?.appendChild(this.cardDescription);
    parent?.appendChild(this.root);
  }

  private addEventHandler(card: CardUI, index: number, hand: Hand) {
    let cardDesc = this.cardDescription;
    card.onClick(() => {
      const cardRemoved = hand.removeCard(index);
      cardRemoved.getEffect()?.apply();
      this.cards.forEach((card) => card.removeOnClickHandler());
      this.updateUI(hand);
    });
    card.onHover({
      onMouseEnter(card) {
        if (card.getDescription().replaceAll(" ", "") != "") {
          cardDesc.classList.add("display-description");
          cardDesc.innerText = card.getDescription();
        }
      },
      onMouseLeave() {
        cardDesc.classList.remove("display-description");
        cardDesc.innerText = "";
      },
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
