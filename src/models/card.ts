import { CardEffects } from "../enums/CardEffects";
import type { ICard } from "../interfaces/ICard";
import type { ICardEffect } from "../interfaces/ICardEffect";
import type { IEffect } from "../interfaces/IEffect";
import type { Deck } from "./deck";
import { DrawEffect } from "./draw_effect";
import type { Hand } from "./hand";

export class Card {
  private id: number;
  private name: string;
  private description: string;
  private effect: IEffect | null;
  private effectMeta: ICardEffect | null;

  constructor(data: ICard) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.effect = null;
    this.effectMeta = null;
    if (data.effect) this.effectMeta = data.effect;
  }

  public setEffectBasedOnType(deck: Deck, hand: Hand) {
    if (!this.effectMeta) return;
    switch (this.effectMeta.type) {
      case CardEffects.DRAW_THEN_SHUFFLE:
        this.effect = new DrawEffect(deck, hand);
        break;
    }
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
