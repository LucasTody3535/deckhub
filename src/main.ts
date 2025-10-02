import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./models/deck";
import { Hand } from "./models/hand";
import "./style.css";
import "./animations.css";
import type { Card } from "./models/card";
import { DeckUI } from "./ui/deck_ui";

const appContainer = document.getElementById("app") as HTMLElement;
const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck: Deck | null = null;
let hand: Hand | null = null;
let data = null;

let didAlreadyAnimationButton = false;

let cardClickListener: () => void;

function updateHandUI(handUIContainer: HTMLElement) {
  let cardTitle: HTMLElement;
  let cardContainer: HTMLElement;
  let cards = hand!.getCards();
  let cardRemoved: Card | null;
  let cardDrawed: Card | null;
  if (handUIContainer.childElementCount > 0) handUIContainer.replaceChildren();
  cards.forEach((card, index) => {
    cardContainer = document.createElement("div");
    cardTitle = document.createElement("p");
    cardContainer.classList.add("hand-ui-card");
    cardTitle.innerText = card.getName();
    cardContainer.append(cardTitle);
    cardClickListener = () => {
      cardRemoved = hand!.removeCard(index);
      cardRemoved.getEffects()?.forEach((effect) => {
        if (effect.draw) {
          if (effect.shuffleBefore) deck!.shuffle();
          cardDrawed = deck!.drawCard();
          if (effect.shuffleAfter) deck!.shuffle();
          if (cardDrawed) hand!.addOneCard(cardDrawed);
        }
      });
      handUIContainer.childNodes.forEach((node) => {
        node.removeEventListener("click", cardClickListener);
      });
      updateHandUI(handUIContainer);
    };
    cardContainer.addEventListener("click", cardClickListener);
    handUIContainer.appendChild(cardContainer);
  });
}

function createHandUI() {
  let handUIContainer = document.createElement("div");
  handUIContainer.classList.add("hand-ui");
  updateHandUI(handUIContainer);
  appContainer.appendChild(handUIContainer);
  return handUIContainer;
}

function prepareUI() {
  let handUI: HTMLElement;
  if (!didAlreadyAnimationButton) {
    const animationClass = "load-deck-btn-when-game-started";
    loadDeckBtn.classList.add(animationClass);
    loadDeckBtn.addEventListener("animationend", () => {
      didAlreadyAnimationButton = true;
      const deckUI = new DeckUI(appContainer);
      handUI = createHandUI();
      deckUI.onClick(() => {
        let card: Card | null;
        card = deck!.drawCard();
        if (card) {
          hand!.addOneCard(card);
          updateHandUI(handUI);
        }
      });
    });
  }
}

fileInput.addEventListener("change", (event: Event) => {
  const files = (event.target as HTMLInputElement).files!;
  const file = files[0];
  const reader = new FileReader();

  if (!file) return;
  if (file.type != "application/json") return;

  reader.onloadend = () => {
    data = JSON.parse(reader.result as string) as IDeckStructure;
    deck = new Deck(data);
    hand = new Hand(deck.drawInitialQuantity());
    prepareUI();
  };
  reader.readAsText(file);
});

loadDeckBtn.addEventListener("click", (_) => fileInput.click());
