export class CardDescriptionUI {
  private root: HTMLElement;
  private cardName: HTMLParagraphElement;
  private cardDesc: HTMLParagraphElement;
  private closeBtn: HTMLElement;
  private mutationObserver: MutationObserver;

  constructor(parent: HTMLElement) {
    this.root = document.createElement("div");
    this.cardName = document.createElement("p");
    this.cardDesc = document.createElement("p");
    this.closeBtn = document.createElement("i");
    this.root.id = "hand-ui-card-description";
    this.closeBtn.dataset.feather = "x";
    this.root.append(this.cardName, this.cardDesc, this.closeBtn);
    // Should be called once
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes.length == 1) {
          this.closeBtn = this.root.children[2] as HTMLElement;
          this.closeBtn.addEventListener("click", (_) => this.hide());
          this.mutationObserver.disconnect();
        }
      }
    });
    this.mutationObserver.observe(this.root, { childList: true });
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
