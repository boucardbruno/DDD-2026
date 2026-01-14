import * as fs from 'fs';
import * as path from 'path';
import { AuditoriumDto } from './dtos';

export class AuditoriumLayoutRepository {
  private readonly repository: Map<string, AuditoriumDto> = new Map();

  constructor() {
    const jsonDirectory = path.join(process.cwd(), '..', '..', 'Stubs', 'AuditoriumLayouts');

    if (fs.existsSync(jsonDirectory)) {
      const files = fs.readdirSync(jsonDirectory);
      for (const file of files) {
        if (file.endsWith('_theater.json')) {
          const filePath = path.join(jsonDirectory, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const auditoriumDto = JSON.parse(content) as AuditoriumDto;
          const showId = file.split('-')[0];
          this.repository.set(showId, auditoriumDto);
        }
      }
    }
  }

  public findByShowId(showId: string): AuditoriumDto {
    if (this.repository.has(showId)) {
      return this.repository.get(showId)!;
    }

    return { Rows: {}, Corridors: [] };
  }
}
