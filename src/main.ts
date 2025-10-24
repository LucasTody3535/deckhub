import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./core/Deck";
import { Hand } from "./core/Hand";
import "./style.css";
import "./animations.css";
import type { Card } from "./core/Card";
import { DeckUI } from "./ui/DeckUI";
import { HandUI } from "./ui/HandUI";
import { DiscardPile } from "./core/DiscardPile";
import { DiscardPileUI } from "./ui/DiscardPileUI";
import { CardDescriptionUI } from "./ui/CardDescriptionUI";

const appContainer = document.getElementById("app") as HTMLElement;
const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck: Deck | null = null;
let hand: Hand | null = null;
let discardPile: DiscardPile | null = null;
let data = null;

let didAlreadyAnimatedButton = false;
let deckUI: DeckUI;
let handUI: HandUI;
let cardDescUI: CardDescriptionUI;
let discardPileUI: DiscardPileUI;

function prepareUI() {
  if (!didAlreadyAnimatedButton) {
    const animationClass = "load-deck-btn-when-game-started";
    loadDeckBtn.classList.add(animationClass);
    loadDeckBtn.addEventListener("animationend", () => {
      didAlreadyAnimatedButton = true;
      deckUI = new DeckUI(appContainer);
      cardDescUI = new CardDescriptionUI(appContainer);
      handUI = new HandUI(cardDescUI, appContainer);
      discardPileUI = new DiscardPileUI(appContainer);
      deckUI.updateDeckName(deck!.getName());
      deckUI.updateCardCount(deck!.getCards().length);
      handUI.updateUI(hand!);
      deckUI.onClick(() => {
        let card: Card | null;
        card = deck!.drawCard();
        if (card) {
          hand!.addOneCard(card);
          handUI.updateUI(hand!);
        }
      });
      discardPileUI.onClick(() => {
        discardPileUI.drawCardNamesIntoList(discardPile!.getCards());
        loadDeckBtn.classList.add("to-behind");
      });
      deck!.addListenerForCardQuantityChange((quantity: number) => {
        deckUI.updateCardCount(quantity);
      });
      hand!.onCardRemoved((_) => handUI.updateUI(hand!));
      hand!.onCardRemoved((card) => discardPile!.addCard(card));
      hand!.onCardRemoved((_) => discardPileUI.dismissCardList());
      discardPile!.onCardAdded((quantity) =>
        discardPileUI.updateCardCounter(quantity),
      );
    });
  } else {
    deckUI.updateDeckName(deck!.getName());
    deckUI.updateCardCount(deck!.getCards().length);
    handUI.updateUI(hand!);
    discardPileUI.updateCardCounter(0);
  }
  deck!.addListenerForCardQuantityChange((quantity: number) => {
    deckUI.updateCardCount(quantity);
  });
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
    hand = new Hand();
    discardPile = new DiscardPile();
    deck.getCards().forEach((card) => card.setEffectBasedOnType(deck!, hand!));
    hand.setInitialHand(deck.drawInitialQuantity());
    prepareUI();
  };
  reader.readAsText(file);
});

loadDeckBtn.addEventListener("click", (_) => fileInput.click());
