export class CreatePlaceDto {
  name: string;
  description: string;
  category: string;
  address: string;
  services?: string[];
  status?: string;
}
