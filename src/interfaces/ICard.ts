import type { ICardEffect } from "./ICardEffect";

export interface ICard {
  id: number;
  name: string;
  description: string;
  quantity: number;
  effect?: ICardEffect;
}
