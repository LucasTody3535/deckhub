import type { ICard } from "../interfaces/ICard";
import type { IEffect } from "../interfaces/IEffect";

export class Card {
  private id: number;
  private name: string;
  private description: string;
  private effect: IEffect | null;

  constructor(data: ICard) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.effect = null;
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

  public getEffect() {
    return this.effect;
  }
}
