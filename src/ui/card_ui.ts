export class CardUI {
  private root: HTMLElement;
  private text: HTMLParagraphElement;

  constructor(parent: HTMLElement, text: string) {
    this.root = document.createElement("div");
    this.text = document.createElement("p");
    this.text.innerText = text;
    this.root.classList.add("hand-ui-card");
    this.root.appendChild(this.text);
    parent.appendChild(this.root);
  }

  public onClick(event: () => void) {
    this.root.addEventListener("click", event);
  }
}
