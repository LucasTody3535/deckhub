import type { IDeckStructure } from "../interfaces/IDeckStructure";
import { Card } from "./Card";

export class Deck {
  private name: string;
  private initialDrawAfterFirstShuffle: number;
  private drawQuantityInEachTurn: number;
  private cards: Array<Card>;

  constructor(data: IDeckStructure) {
    this.name = data.name;
    this.initialDrawAfterFirstShuffle = data.initialDrawAfterFirstShuffle;
    this.drawQuantityInEachTurn = data.drawQuantityInEachTurn;
    this.cards = [];
    data.cards.forEach((card) => {
      for (let i = 0; i < card.quantity; i++) {
        this.cards.push(new Card(card));
      }
    });
  }

  public getName() {
    return this.name;
  }

  public getInitialDraw() {
    return this.initialDrawAfterFirstShuffle;
  }

  public getDrawInEachTurn() {
    return this.drawQuantityInEachTurn;
  }

  public getCards() {
    return this.cards;
  }

  /**
   * Implementation of the Durstenfeld's version of the Fisher-Yates
   * shuffle algorithm, obtained in https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle.
   * It was consulted the book The Art of Programming 3rd Edition
   * (Volume 2 - Seminumerical Algorithms) from Donald E. Knuth in the
   * page 145 under "Algorithm P (Shuffling)"
   */
  public shuffle() {
    let cards = this.cards;
    for (let i = cards.length - 1; i >= 1; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  public drawInitialQuantity(): Array<Card> {
    this.shuffle();
    return this.cards.splice(0, this.initialDrawAfterFirstShuffle);
  }

  public drawCard(): Card | null {
    if (this.cards.length > 0) return this.cards.shift()!;
    return null;
  }

  public getCardById(id: number): Card | undefined {
    if (this.cards.length > 0)
      return this.cards.find((card) => card.getId() == id);
    return undefined;
  }
}
