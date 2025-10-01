import type { IDeckStructure } from "./interfaces/IDeckStructure";
import { Deck } from "./models/deck";
import "./style.css";

const fileInput = document.getElementById("file-input") as HTMLElement;
const loadDeckBtn = document.getElementById("load-deck-btn") as HTMLElement;
let deck = null;

fileInput.addEventListener("change", (event: Event) => {
  const files = (event.target as HTMLInputElement).files!;
  const file = files[0];
  const reader = new FileReader();

  if (!file) return;
  if (file.type != "application/json") return;

  reader.onloadend = () => {
    const data = JSON.parse(reader.result as string) as IDeckStructure;
    deck = new Deck(data);
  };
  reader.readAsText(file);
});

loadDeckBtn.addEventListener("click", (_) => fileInput.click());
