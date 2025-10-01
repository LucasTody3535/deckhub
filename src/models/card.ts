import type { ICard } from "../interfaces/ICard";
import type { ICardEffect } from "../interfaces/ICardEffect";

export class Card {
  private id: number;
  private name: string;
  private description: string;
  private effects: Array<ICardEffect> | null;

  constructor(data: ICard) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.effects = data.effects || null;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getEffects() {
    return this.effects;
  }
}
