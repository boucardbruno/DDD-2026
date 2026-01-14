import { PricingCategory, SeatingPlaceAvailability } from './enums';
import { SeatingPlace } from './seatingPlace';

describe('SeatingPlace', () => {
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

    expect(secondInstance).toEqual(firstInstance);

    // Should not mutate existing instance
    secondInstance.allocate();
    expect(secondInstance).toEqual(firstInstance);
  });
});
