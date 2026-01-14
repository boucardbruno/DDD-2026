import { AuditoriumLayoutRepository } from '../externalDependencies/auditoriumLayoutRepository';
import { ReservationsProvider } from '../externalDependencies/reservationsProvider';
import { AuditoriumSeatingArrangements } from './auditoriumSeatingArrangements';

describe('AuditoriumSeatingArrangement', () => {
  test('be a value type', () => {
    const auditoriumLayoutAdapter = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const showIdWithoutReservationYet = '18';
    const auditoriumSeatingFirstInstance = auditoriumLayoutAdapter.findByShowId(
      showIdWithoutReservationYet
    );
    const auditoriumSeatingSecondInstance = auditoriumLayoutAdapter.findByShowId(
      showIdWithoutReservationYet
    );

    // Two different instances with same values should be equals
    expect(auditoriumSeatingSecondInstance).toEqual(auditoriumSeatingFirstInstance);

    // Should not mutate existing instance
    auditoriumSeatingSecondInstance.getRows().values().next().value?.getSeatingPlaces()[0]?.allocate();
    expect(auditoriumSeatingSecondInstance).toEqual(auditoriumSeatingFirstInstance);
  });
});
