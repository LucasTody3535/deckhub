import type { Hand } from "../core/Hand";
import type { CardDescriptionUI } from "./CardDescriptionUI";
import { CardUI } from "./CardUI";

export class HandUI {
  private root: HTMLElement;
  private cards!: Array<CardUI>;

  constructor(parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.root.classList.add("hand-ui");
    parent?.appendChild(this.root);
  }

  private addEventHandler(
    card: CardUI,
    index: number,
    hand: Hand,
    cardDescUI: CardDescriptionUI,
  ) {
    card.onClick(() => {
      const cardRemoved = hand.removeCard(index);
      cardRemoved.getEffect()?.apply();
      this.cards.forEach((card) => card.removeOnClickHandler());
      this.updateUI(hand, cardDescUI);
    });
    card.onHover({
      onMouseEnter(card) {
        if (card.getDescription().replaceAll(" ", "") != "") {
          cardDescUI.updateData(card.getName(), card.getDescription());
          cardDescUI.display();
        }
      },
      onMouseLeave() {
        cardDescUI.hide();
      },
    });
  }

  public updateUI(hand: Hand, cardDescUI: CardDescriptionUI) {
    let handCards = hand.getCards();
    if (this.root.hasChildNodes()) this.root.replaceChildren();
    this.cards = [];
    handCards.forEach((card, index) => {
      this.cards.push(new CardUI(this.root, card));
      this.addEventHandler(this.cards[index], index, hand, cardDescUI);
    });
  }
}
