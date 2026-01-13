import * as fs from 'fs';
import * as path from 'path';
import { ReservedSeatsDto } from './reserved-seats-dto';

export class ReservationsProvider {
  private readonly repository = new Map<string, ReservedSeatsDto>();

  constructor() {
    const jsonDirectory = path.join(__dirname, '../../../../../Stubs/AuditoriumLayouts');

    const files = fs.readdirSync(jsonDirectory);
    for (const file of files) {
      if (file.includes('_booked_seats.json')) {
        const filePath = path.join(jsonDirectory, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const reservedSeatsDto: ReservedSeatsDto = JSON.parse(content);
        this.repository.set(file.split('-')[0], reservedSeatsDto);
      }
    }
  }

  public getReservedSeats(showId: string): ReservedSeatsDto {
    if (this.repository.has(showId)) {
      return this.repository.get(showId)!;
    }

    return { ReservedSeats: [] };
  }
}
