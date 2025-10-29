import type { Card } from "../core/Card";

type HoverEvent = {
  onMouseEnter: (card: Card) => void;
};

export class CardUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;
  private card: Card;
  private clickHandler!: () => void;
  private rightClickHandler!: (ev: Event) => void;
  private hoverHandler!: HoverEvent;

  constructor(parent: HTMLElement, card: Card) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.card = card;
    this.text.innerText = card.getName();
    this.root.classList.add("hand-ui-card");
    this.root.appendChild(this.text);
    parent.appendChild(this.root);
  }

  public onClick(event: () => void) {
    this.clickHandler = event;
    this.root.addEventListener("click", this.clickHandler);
  }

  public onRightClick(event: (card: Card) => void) {
    this.rightClickHandler = (ev: Event) => {
      ev.preventDefault();
      event(this.card);
    };
    this.root.addEventListener("contextmenu", this.rightClickHandler);
  }

  public removeClickEvents() {
    this.root.removeEventListener("click", this.clickHandler);
    this.root.removeEventListener("contextmenu", this.rightClickHandler);
  }

  public onHover(hoverEv: HoverEvent) {
    this.root.addEventListener("mouseenter", () =>
      hoverEv.onMouseEnter(this.card),
    );
  }

  public removeOnHover() {
    this.root.removeEventListener("mouseenter", () =>
      this.hoverHandler.onMouseEnter(this.card),
    );
  }
}
