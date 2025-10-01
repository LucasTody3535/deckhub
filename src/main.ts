import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./models/deck";
import { Hand } from "./models/hand";
import "./style.css";
import "./animations.css";

const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck = null;
let hand = null;
let data = null;

let didAlreadyAnimationButton = false;

function prepareUI() {
  if (!didAlreadyAnimationButton) {
    const animationClass = "load-deck-btn-when-game-started";
    loadDeckBtn.classList.add(animationClass);
    loadDeckBtn.addEventListener("animationend", () => {
      didAlreadyAnimationButton = true;
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
