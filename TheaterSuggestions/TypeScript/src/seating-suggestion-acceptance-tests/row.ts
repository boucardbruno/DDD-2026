import { SeatingPlace } from './seating-place';

export class Row {
  constructor(private readonly name: string, private readonly _seatingPlaces: SeatingPlace[]) {}

  public seatingPlaces(): SeatingPlace[] {
    return this._seatingPlaces;
  }
}
