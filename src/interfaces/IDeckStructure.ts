import type { ICard } from "./ICard";

export interface IDeckStructure {
  name: string;
  initialDrawAfterFirstShuffle: number;
  drawQuantityInEachTurn: number;
  cards: Array<ICard>;
}
