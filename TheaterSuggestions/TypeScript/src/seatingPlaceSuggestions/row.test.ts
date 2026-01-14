import { PricingCategory, SeatingPlaceAvailability } from './enums';
import { SeatingPlace } from './seatingPlace';
import { Row } from './row';

describe('Row', () => {
  test('be a value type', () => {
    const firstInstance = new SeatingPlace(
      'A',
      1,
      PricingCategory.Second,
      SeatingPlaceAvailability.Available
    );
    const secondInstance = new SeatingPlace(
      'A',
      1,
      PricingCategory.Second,
      SeatingPlaceAvailability.Available
    );
    const row1 = new Row('A', [firstInstance, secondInstance]);
    const row2 = new Row('A', [firstInstance, secondInstance]);

    expect(row1 === row2).toBeTruthy();
  });
});
