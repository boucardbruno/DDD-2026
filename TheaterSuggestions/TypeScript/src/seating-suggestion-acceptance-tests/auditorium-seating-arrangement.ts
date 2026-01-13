import { Row } from './row';

export class AuditoriumSeatingArrangement {
  constructor(private readonly _rows: Map<string, Row>) {}

  public rows(): Map<string, Row> {
    return this._rows;
  }
}
