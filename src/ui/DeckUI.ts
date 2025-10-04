import type { Deck } from "../core/Deck";

export class DeckUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;
  private cardCount: HTMLParagraphElement;

  constructor(deck: Deck, parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.cardCount = document.createElement("p");
    this.text.innerText = "Deck";
    this.cardCount.innerText = deck.getCards().length.toString();
    this.root.classList.add("deck-ui");
    this.text.classList.add("deck-ui-text");
    this.cardCount.classList.add("deck-ui-card-count");
    this.root.append(this.text, this.cardCount);
    parent?.appendChild(this.root);
  }

  public onClick(event: () => void) {
    this.root.addEventListener("click", event);
  }
}
