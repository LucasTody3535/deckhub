export class DeckUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;

  constructor(parent?: HTMLElement) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.text.innerText = "Deck";
    this.root.classList.add("deck-ui");
    this.text.classList.add("deck-ui-text");
    this.root.appendChild(this.text);
    parent?.appendChild(this.root);
  }

  public onClick(event: () => void) {
    this.root.addEventListener("click", event);
  }
}
