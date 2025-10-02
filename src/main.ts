import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./models/deck";
import { Hand } from "./models/hand";
import "./style.css";
import "./animations.css";

const appContainer = document.getElementById("app") as HTMLElement;
const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck = null;
let hand: Hand | null = null;
let data = null;

let didAlreadyAnimationButton = false;

function updateHandUI(handUIContainer: HTMLElement) {
  let cardTitle: HTMLElement;
  let cardContainer: HTMLElement;
  let cards = hand!.getCards();
  if (handUIContainer.childElementCount > 0) handUIContainer.replaceChildren();
  cards.forEach((card) => {
    cardContainer = document.createElement("div");
    cardTitle = document.createElement("p");
    cardContainer.classList.add("hand-ui-card");
    cardTitle.innerText = card.getName();
    cardContainer.append(cardTitle);
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

function createDeckUI() {
  let container = document.createElement("div");
  let text = document.createElement("p");
  text.innerText = "Deck";
  text.classList.add("deck-ui-text");
  container.classList.add("deck-ui");
  container.appendChild(text);
  appContainer.appendChild(container);
  return container;
}

function prepareUI() {
  let deckUI = null;
  let handUI = null;
  if (!didAlreadyAnimationButton) {
    const animationClass = "load-deck-btn-when-game-started";
    loadDeckBtn.classList.add(animationClass);
    loadDeckBtn.addEventListener("animationend", () => {
      didAlreadyAnimationButton = true;
      deckUI = createDeckUI();
      handUI = createHandUI();
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
