export class CardDescriptionUI {
  private root: HTMLElement;
  private cardName: HTMLParagraphElement;
  private cardDesc: HTMLParagraphElement;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.cardName = document.createElement("p");
    this.cardDesc = document.createElement("p");
    this.root.id = "hand-ui-card-description";
    this.root.append(this.cardName, this.cardDesc);
    parent.appendChild(this.root);
  }

  updateData(cardName: string, cardDesc: string) {
    this.cardName.innerText = cardName;
    this.cardDesc.innerText = cardDesc;
  }

  display() {
    this.root.classList.add("display-description");
  }

  hide() {
    this.root.classList.remove("display-description");
  }

  isVisible() {
    return this.root.classList.contains("display-description");
  }
}
