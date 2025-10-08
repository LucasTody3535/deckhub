import type { Card } from "../core/Card";

export class DiscardPileUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;
  private cardCount: HTMLParagraphElement;
  private cardListRoot: HTMLElement;
  private clickListener!: () => void;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.cardCount = document.createElement("p");
    this.cardListRoot = document.createElement("div");
    this.text.innerText = "Discard Pile";
    this.cardCount.innerText = "0";
    this.root.id = "discard-pile-ui";
    this.cardListRoot.id = "discard-pile-card-list-ui";
    this.root.append(this.text, this.cardCount);
    parent.append(this.root, this.cardListRoot);
  }

  public drawCardNamesIntoList(cards: Array<Card>) {
    let cardName: HTMLParagraphElement;
    let closeBtn = document.createElement("button");
    let buttonContainer = document.createElement("div");
    let cardsContainer = document.createElement("div");
    if (this.cardListRoot.hasChildNodes()) this.cardListRoot.replaceChildren();
    closeBtn.innerText = "Close";
    buttonContainer.id = "btn-container";
    cardsContainer.id = "cards-container";
    for (let i = cards.length - 1; i >= 0; i--) {
      cardName = document.createElement("p");
      cardName.innerText = cards[i].getName();
      cardsContainer.append(cardName);
    }
    buttonContainer.appendChild(closeBtn);
    buttonContainer.addEventListener("click", (_) => this.dismissCardList());
    this.cardListRoot.classList.add("show-discard-pile-list");
    this.cardListRoot.append(buttonContainer, cardsContainer);
  }

  public dismissCardList() {
    if (this.cardListRoot.classList.contains("show-discard-pile-list"))
      this.cardListRoot.classList.remove("show-discard-pile-list");
  }

  public onClick(listener: () => void) {
    this.root.removeEventListener("click", this.clickListener);
    this.clickListener = listener;
    this.root.addEventListener("click", this.clickListener);
  }

  public updateCardCounter(quantity: number) {
    this.cardCount.innerText = quantity.toString();
  }
}
