import type { Deck } from "../core/Deck";

export class DeckUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;
  private cardCount: HTMLParagraphElement;
  private deckName: HTMLParagraphElement;

  constructor(deck: Deck, parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.cardCount = document.createElement("p");
    this.deckName = document.createElement("p");
    this.text.innerText = "Deck";
    this.deckName.innerText = deck.getName();
    this.cardCount.innerText = deck.getCards().length.toString();
    this.root.classList.add("deck-ui");
    this.text.classList.add("deck-ui-text");
    this.cardCount.classList.add("deck-ui-card-count");
    this.deckName.classList.add("deck-ui-deck-name");
    this.root.append(this.text, this.cardCount);
    parent?.append(this.root, this.deckName);
  }

  public onClick(event: () => void) {
    this.root.addEventListener("click", event);
  }

  public updateCardCount(quantity: number) {
    this.cardCount.innerText = quantity.toString();
  }

  public updateDeckName(deckName: string) {
    this.deckName.innerText = deckName;
  }
}
