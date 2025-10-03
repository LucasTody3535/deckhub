import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./core/Deck";
import { Hand } from "./core/Hand";
import "./style.css";
import "./animations.css";
import type { Card } from "./core/Card";
import { DeckUI } from "./ui/deck_ui";
import { HandUI } from "./ui/hand_ui";

const appContainer = document.getElementById("app") as HTMLElement;
const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck: Deck | null = null;
let hand: Hand | null = null;
let data = null;

let didAlreadyAnimationButton = false;

function prepareUI() {
  if (!didAlreadyAnimationButton) {
    const animationClass = "load-deck-btn-when-game-started";
    loadDeckBtn.classList.add(animationClass);
    loadDeckBtn.addEventListener("animationend", () => {
      didAlreadyAnimationButton = true;
      const deckUI = new DeckUI(appContainer);
      const handUI = new HandUI(hand!, deck!, appContainer);
      deckUI.onClick(() => {
        let card: Card | null;
        card = deck!.drawCard();
        if (card) {
          hand!.addOneCard(card);
          handUI.updateUI();
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
    deck.getCards().forEach((card) => card.setEffectBasedOnType(deck!, hand!));
    prepareUI();
  };
  reader.readAsText(file);
});

loadDeckBtn.addEventListener("click", (_) => fileInput.click());
