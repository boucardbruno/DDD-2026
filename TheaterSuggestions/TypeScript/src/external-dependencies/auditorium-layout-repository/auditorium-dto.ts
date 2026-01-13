export interface SeatDto {
  Name: string;
  Category: number;
}

export interface CorridorDto {
  Number: number;
  InvolvedRowNames: string[];
}

export interface AuditoriumDto {
  Rows: Record<string, SeatDto[]>;
  Corridors: CorridorDto[];
}
