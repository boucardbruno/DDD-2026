import { AuditoriumLayoutRepository } from '../external-dependencies/auditorium-layout-repository/auditorium-layout-repository';
import { ReservationsProvider } from '../external-dependencies/reservations-provider/reservations-provider';
import { AuditoriumSeatingArrangement } from './auditorium-seating-arrangement';
import { AuditoriumDto } from '../external-dependencies/auditorium-layout-repository/auditorium-dto';
import { ReservedSeatsDto } from '../external-dependencies/reservations-provider/reserved-seats-dto';
import { Row } from './row';
import { SeatingPlace } from './seating-place';
import { PricingCategory } from './pricing-category';
import { SeatingPlaceAvailability } from './seating-place-availability';

export class AuditoriumSeatingArrangements {
  constructor(
    private readonly auditoriumLayoutRepository: AuditoriumLayoutRepository,
    private readonly reservedSeatsRepository: ReservationsProvider
  ) {}

  public findByShowId(showId: string): AuditoriumSeatingArrangement {
    return this.adapt(
      this.auditoriumLayoutRepository.findByShowId(showId),
      this.reservedSeatsRepository.getReservedSeats(showId)
    );
  }

  private adapt(auditoriumDto: AuditoriumDto, reservedSeatsDto: ReservedSeatsDto): AuditoriumSeatingArrangement {
    const rows = new Map<string, Row>();

    for (const [rowName, seatDtos] of Object.entries(auditoriumDto.Rows)) {
      const seats: SeatingPlace[] = seatDtos.map((seatDto) => {
        const number = this.extractNumber(seatDto.Name);
        const pricingCategory = this.convertCategory(seatDto.Category);
        const isReserved = reservedSeatsDto.ReservedSeats.includes(seatDto.Name);

        return new SeatingPlace(
          rowName,
          number,
          pricingCategory,
          isReserved ? SeatingPlaceAvailability.Reserved : SeatingPlaceAvailability.Available
        );
      });

      rows.set(rowName, new Row(rowName, seats));
    }

    return new AuditoriumSeatingArrangement(rows);
  }

  private convertCategory(seatDtoCategory: number): PricingCategory {
    return seatDtoCategory as PricingCategory;
  }

  private extractNumber(name: string): number {
    return parseInt(name.substring(1), 10);
  }
}
